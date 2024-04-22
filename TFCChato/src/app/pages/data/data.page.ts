import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataPage implements OnInit {

  constructor(
    protected _firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

}
