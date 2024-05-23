import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { UsersService } from 'src/app/core/services/api/users.service';

@Component({
  selector: 'app-incidents-info',
  templateUrl: './incidents-info.component.html',
  styleUrls: ['./incidents-info.component.scss'],
})
export class IncidentsInfoComponent implements OnInit {
  isScreenSmall: boolean = false;
  @Input() incident: incidentInfo | undefined;
  @Output() onIncidentClicked: EventEmitter<string> =
    new EventEmitter<string>();
  formattedTime: string | undefined;
  formattedDay: string | undefined;
  userName: string | undefined;

  /**
   * Constructs a component constructor function.
   * Initializes the component by checking the initial screen size.
   *
   * @param userService UsersService - a service for managing user-related operations.
   */

  constructor(private userService: UsersService) {
    this.checkScreenSize(window.innerWidth);
  }

  /**
   * Initializes the component.
   */

  ngOnInit() {
    if (this.incident) {
      if (typeof this.incident.date === 'string') {
        const timestamp = new Date(this.incident.date);
        this.formattedDay = timestamp.toLocaleDateString();
        this.formattedTime = timestamp.toLocaleTimeString();
      } else {
        const timestamp = this.incident.date;
        const date = timestamp.toDate();
        this.formattedDay = date.toLocaleDateString();
        this.formattedTime = date.toLocaleTimeString();
      }
      this.userService.getUserById(this.incident.userId).subscribe((user) => {
        this.userName = user ? user.name : '';
      });
    }
  }

  /**
   * Handles the click event on the incident.
   *
   * @param event Event - the click event.
   */
  onIncidentClick(event: Event) {
    this.onIncidentClicked.emit(this.incident?.uuid);
    event.stopPropagation();
  }

  /**
   * Listens for window resize events and updates the screen size accordingly.
   *
   * @param event any - the resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  /**
   * Checks the screen size and sets a boolean flag accordingly.
   *
   * @param width number - the width of the window.
   */
  private checkScreenSize(width: number) {
    this.isScreenSmall = width <= 1100;
  }
}
