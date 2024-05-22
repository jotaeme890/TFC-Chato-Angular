import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, first, map, switchMap, throwError, of, from, take } from 'rxjs';
import { CategoryInfo } from '../../interfaces/category-info';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firebaseService: FirebaseService) {}

  createCategory(category: CategoryInfo): Observable<string> {
    return this.firebaseService.categories$.pipe(
      first(),
      switchMap(existingCategories => {
        if (existingCategories.some(c => c.name === category.name)) {
          return throwError(() => new Error('Una categoría con este nombre ya existe.'));
        }
        if(this.firebaseService.user){
          category.adminId = this.firebaseService.user.uid || '';
          category.admin = this.firebaseService.user.email || '';
        }
        console.log("object");
        return from(this.firebaseService.createDocument('categoryInfo', category)).pipe(
          switchMap(docRef => {
            const uuid = docRef;
            return from(this.firebaseService.updateDocument('categoryInfo', uuid, { uuid })).pipe(
              map(() => 'Categoría creada y actualizada exitosamente con UUID.')
            );
          })
        );
      }),
      catchError(err => throwError(() => new Error('Error al crear la categoría: ' + err.message)))
    );
  }

  deleteCategory(category: CategoryInfo): Observable<string> {
    return this.firebaseService.incidents$.pipe(
      first(),
      switchMap(incidents => {
        const hasIncident = incidents.some(incident => incident.categoryName === category.name);
        if (hasIncident) {
          return throwError(() => new Error('No se puede borrar la categoría porque tiene incidencias asociadas'));
        }
        return this.firebaseService.deleteDocument('categoryInfo', category.uuid).then(() => {
          return 'Categoría borrada exitosamente.';
        });
      }),
      catchError(err => {
        return throwError(() => new Error(`Error al borrar la categoría: ${err.message}`));
      })
    );
  }

  updateCategory(category: CategoryInfo, originalName: string): Observable<string> {
    return this.firebaseService.incidents$.pipe(
      first(),
      switchMap(incidents => {
        const hasIncidentWithOriginalName = incidents.some(incident => incident.categoryName === originalName);
        if (hasIncidentWithOriginalName) {
          return throwError(() => new Error('No se puede actualizar la categoría porque tiene incidencias asociadas con su nombre original'));
        }
        return from(this.firebaseService.updateDocument('categoryInfo', category.uuid, category)).pipe(
          map(() => 'Categoría actualizada exitosamente.')
        );
      }),
      catchError(err => throwError(() => new Error(`Error al intentar actualizar la categoría: ${err.message}`)))
    );
  }

  /* updateCategory(category: CategoryInfo, originalName: string): Observable<string> {
    return this.firebaseService.incidents$.pipe(
      first(),
      switchMap(incidents => {
        const hasIncidentWithOriginalName = incidents.some(incident => incident.categoryName === originalName);
        const isNameChanged = originalName !== category.name;
        if (hasIncidentWithOriginalName && isNameChanged) {
          return throwError(() => new Error('No se puede cambiar el nombre de la categoría porque tiene incidencias asociadas'));
        }
        return from(this.firebaseService.updateDocument('categoryInfo', category.uuid, category)).pipe(
          map(() => 'Categoría actualizada exitosamente.')
        );
      }),
      catchError(err => {
        return throwError(() => new Error(`Error al intentar actualizar la categoría: ${err.message}`));
      })
    );
  } */
}
