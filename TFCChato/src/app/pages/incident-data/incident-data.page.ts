import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { IncidentsService } from 'src/app/core/services/api/incidents.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-incident-data',
  templateUrl: './incident-data.page.html',
  styleUrls: ['./incident-data.page.scss'],
})
export class IncidentDataPage implements OnInit {
  incidentId: string | null = '';
  incident: any | undefined;
  /**
   * Constructs a component constructor function.
   *
   * @param route ActivatedRoute - a service provided by Angular that gives access to information about a route associated with a component loaded in an outlet.
   * @param incidentsService IncidentsService - a service for managing incidents.
   * @param dialog MatDialog
   */
  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService,
    public dialog: MatDialog,
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.incidentId = params.get('id');
      if (this.incidentId) {
        this.incidentsService.getIncidentById(this.incidentId).subscribe({
          next: (incident) => {
            if (incident) {
              this.incident = incident;
              if (!incident.checked) {
                incident.checked = true;
                this.incidentsService.updateIncident(incident);
              }
            }
          },
        });
      }
    });
  }

  /**
   * Sets an incident as resolved.
   *
   * @param incident incidentInfo - the incident to be marked as resolved.
   */
  async setResolvedIncident(incident: incidentInfo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'resolved' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        incident.resolved = true;
        this.incident = incident;
        this.incidentsService.updateIncident(incident);
        await Haptics.impact({ style: ImpactStyle.Medium });
        console.log(incident);
      }
    });
  }
}
