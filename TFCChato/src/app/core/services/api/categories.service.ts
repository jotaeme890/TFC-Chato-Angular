import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  // TODO: AL BORRAR UNA CATEGORIA VER SI YA TIENE INCIDENCIAS Y VER QUE HACER
  deleteCategory(info: any){
    console.log(info);
    // this.firebaseService.deleteDocument('categoryInfo', info.id)
  }

  // TODO: AL BORRAR UNA CATEGORIA VER SI YA TIENE INCIDENCIAS Y VER QUE HACER
  updateCategory(category: any) {
    this.firebaseService.updateDocument('incidentsInfo', category.uuid, category)
  }
}
