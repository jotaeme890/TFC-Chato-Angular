import { Component, Input, OnInit } from '@angular/core';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';

@Component({
  selector: 'app-incidents-info',
  templateUrl: './incidents-info.component.html',
  styleUrls: ['./incidents-info.component.scss'],
})
export class IncidentsInfoComponent  implements OnInit {

  @Input() incident: incidentInfo | undefined

  constructor() { }

  ngOnInit() {}

}
