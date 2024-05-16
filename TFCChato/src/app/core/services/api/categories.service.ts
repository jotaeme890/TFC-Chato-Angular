import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  deleteCategory(categoryId: string){
    this.firebaseService.deleteDocument('categoryInfo', categoryId)
  }

  updateCategory(category: any) {
    this.firebaseService.updateDocument('incidentsInfo', category.uuid, category)
  }
}
