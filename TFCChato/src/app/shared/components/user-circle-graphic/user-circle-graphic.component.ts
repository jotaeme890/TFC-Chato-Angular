import { Component, OnInit } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-user-circle-graphic',
  templateUrl: './user-circle-graphic.component.html',
  styleUrls: ['./user-circle-graphic.component.scss'],
})
export class UserCircleGraphicComponent  implements OnInit {

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
  ) { }

  /**
  * Initializes the component and fetches user data from Firebase to generate a chart.
  */
  ngOnInit() {
    this._firebaseService.users$.pipe(
      map(users => {
        const rolesCount = users.reduce((acc: any, user: any) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});
        const roles = Object.keys(rolesCount);
        return { roles, rolesCount };
      }),
      switchMap(({ roles, rolesCount }) => {
        return forkJoin(
          roles.map(role => this.translate.get(`forms.${role}`))
        ).pipe(
          map(translations => ({
            labels: translations,
            datasets: [{
              data: roles.map(role => rolesCount[role]),
              backgroundColor: ['#42A5F5', '#66BB6A'],
              hoverBackgroundColor: ['#64B5F6', '#81C784']
            }]
          }))
        );
      })
    ).subscribe(chartData => {
      this.data = chartData;
      this.options = {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        }
      };
    });
  }

}
