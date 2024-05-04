import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _auth: AuthService,
    private router: Router,
    public firebaseService: FirebaseService
  ) {}

  incidentInfo(id: string) {
    if (id) {
      console.log(id);
      this.router.navigate(['/home/incident-data', id])
    }
  }

}
