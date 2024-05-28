import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { IncidentsService } from 'src/app/core/services/api/incidents.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'primeng/api';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-incident-data',
  templateUrl: './incident-data.page.html',
  styleUrls: ['./incident-data.page.scss'],
  providers: [MessageService],
})
export class IncidentDataPage implements OnInit {
  incidentId: string | null = '';
  incident: any | undefined;
  /**
   * Constructs a component constructor function.
   *
   * @param route ActivatedRoute - a service provided by Angular that gives access to information about a route associated with a component loaded in an outlet.
   * @param incidentsService IncidentsService - a service for managing incidents.
   * @param translate CustomTranslateService - a service for handling translation services within the component or service where it is injected.
   * @param messageService MessageService - a service for displaying messages or notifications to the user within the application.
   * @param dialog MatDialog - a service for displaying dialog boxes.
   */
  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService,
    private translate: CustomTranslateService,
    private messageService: MessageService,
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
        this.incidentsService.updateIncident(incident).subscribe({
          next: async _ => {
            this.showSuccess('good');
            await Haptics.impact({ style: ImpactStyle.Medium });
          },
          error: async error => {
            this.incident.resolved = false;
            this.showError('error');
            await Haptics.impact({ style: ImpactStyle.Heavy });
          }
        });
      }
    });
  }
  
  /**
   * The function `showSuccess` displays a success message after translating the input text.
   *
   * @param text The `text` parameter in the `showSuccess` function is a string that represents the
   * message to be displayed as a success toast notification.
   */
  showSuccess(text: string) {
    let message = `toast.${text}`;
    this.translate.get(message).subscribe({
      next: (text: string) => {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          detail: text,
        });
      },
    });
  }

  /**
   * The function `showError` displays an error message using a translation service and a message
   * service.
   *
   * @param text The `text` parameter in the `showError` function is a string that represents the error
   * message to be displayed.
   */
  showError(text: string) {
    let message = `toast.${text}`;
    this.translate.get(message).subscribe({
      next: (text: string) => {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          detail: text,
          life: 6000,
        });
      },
    });
  }
}
