import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from 'src/app/core/services/api/incidents.service';

@Component({
  selector: 'app-incident-data',
  templateUrl: './incident-data.page.html',
  styleUrls: ['./incident-data.page.scss'],
})
export class IncidentDataPage implements OnInit {

  incidentId: string | null= ''

  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.incidentId = params.get('id');
      if( this.incidentId ){
        this.incidentsService.getIncidentById(this.incidentId).subscribe({
          next: incident => {
            if( incident ) {
              console.log(incident);
              if( !incident.checked ){
                incident.checked = true
                this.incidentsService.updateIncident(incident)
              }
            }
          }
        })
      }
    })
  }

}
