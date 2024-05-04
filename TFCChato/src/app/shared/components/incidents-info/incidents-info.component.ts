import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';

@Component({
  selector: 'app-incidents-info',
  templateUrl: './incidents-info.component.html',
  styleUrls: ['./incidents-info.component.scss'],
})
export class IncidentsInfoComponent  implements OnInit {

  @Input() incident: incidentInfo | undefined
  @Output() onIncidentClicked: EventEmitter<string> = new EventEmitter<string>();
  formattedTime: string | undefined;
  formattedDay: string | undefined;

  constructor() { }

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
    }
  }

  onIncidentClick(event: Event) {
    this.onIncidentClicked.emit(this.incident?.uuid);
    event.stopPropagation();
  }

}
