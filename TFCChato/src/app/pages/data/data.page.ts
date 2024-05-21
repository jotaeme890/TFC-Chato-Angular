import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
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
    protected _firebaseService: FirebaseService,
    private router: Router,
    private _categoryService: CategoriesService
  ) { }

  ngOnInit() {
  }

  userInfo(userId: string) {
    this.router.navigate([`/data/user/${userId}`]);
  }

  deleteCategory(info: any) {
    this._categoryService.deleteCategory(info)
  }
}
