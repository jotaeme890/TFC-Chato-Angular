import { Component, OnInit } from '@angular/core';
import { map, switchMap, forkJoin } from 'rxjs';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-incidents-circle-graphic',
  templateUrl: './incidents-circle-graphic.component.html',
  styleUrls: ['./incidents-circle-graphic.component.scss'],
})
export class IncidentsCircleGraphicComponent implements OnInit {
  data: any;
  options: any;

  /**
   * Constructs a component constructor function.
   *
   * @param _firebaseService FirebaseService - a service for handling Firebase-related operations.
   * @param translate CustomTranslateService - a service for handling translation services within the component or service where it is injected.
   */
  constructor(
    private _firebaseService: FirebaseService,
    private translate: CustomTranslateService
  ) {}

  /**
   * Initializes the component and fetches user data from Firebase to generate a chart.
   */
  ngOnInit() {
    this._firebaseService.incidents$
      .pipe(
        map((incidents) => {
          const categoryCounts = incidents.reduce((acc: any, incident: any) => {
            const categoryName = incident.categoryName;
            acc[categoryName] = (acc[categoryName] || 0) + 1;
            return acc;
          }, {});

          return {
            labels: Object.keys(categoryCounts),
            datasets: [
              {
                data: Object.values(categoryCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          };
        })
      )
      .subscribe((chartData) => {
        this.data = chartData;
        this.options = {
          plugins: {
            legend: {
              labels: {
                color: '#495057',
              },
            },
          },
        };
      });
  }
}
