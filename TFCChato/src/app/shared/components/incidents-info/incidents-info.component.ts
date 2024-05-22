import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { UsersService } from 'src/app/core/services/api/users.service';

@Component({
  selector: 'app-incidents-info',
  templateUrl: './incidents-info.component.html',
  styleUrls: ['./incidents-info.component.scss'],
})
export class IncidentsInfoComponent  implements OnInit {

  isScreenSmall: boolean = false;
  @Input() incident: incidentInfo | undefined
  @Output() onIncidentClicked: EventEmitter<string> = new EventEmitter<string>();
  formattedTime: string | undefined;
  formattedDay: string | undefined;
  userName: string | undefined;

  constructor(
    private userService: UsersService
  ) { 
    this.checkScreenSize(window.innerWidth);
  }

  /**
 * This method is called during component initialization. It checks if the incident
 * object exists and, if so, retrieves its timestamp and formats it into a readable date
 * and time format, which are stored in the component's properties `formattedDay` and `formattedTime`.
 */
  ngOnInit() {
    if ( this.incident ) {
      if( typeof this.incident.date === 'string' ){
        const timestamp = new Date(this.incident.date)
        this.formattedDay = timestamp.toLocaleDateString();
        this.formattedTime = timestamp.toLocaleTimeString();
      } else{
        const timestamp = this.incident.date;
        const date = timestamp.toDate();
        this.formattedDay = date.toLocaleDateString();
        this.formattedTime = date.toLocaleTimeString();
      }
      this.userService.getUserById(this.incident.userId).subscribe(user => {
        this.userName = user ? user.name : '';
      });
    }
  }

  onIncidentClick(event: Event) {
    this.onIncidentClicked.emit(this.incident?.uuid);
    event.stopPropagation();
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(width: number) {
    this.isScreenSmall = width <= 1100;
  }

}
