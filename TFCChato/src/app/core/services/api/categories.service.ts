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

  deleteCategory(category: any): Observable<string> {
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

  updateCategory(category: any): Observable<string> {
    return this.firebaseService.incidents$.pipe(
      first(),
      switchMap(incidents => {
        const hasIncident = incidents.some(incident => incident.categoryName === category.name);
        if (hasIncident) {
          return throwError(() => new Error('No se puede actualizar la categoría porque tiene incidencias asociadas'));
        }
        return this.firebaseService.updateDocument('categoryInfo', category.uuid, category).then(() => {
          return 'Categoría actualizada exitosamente.';
        });
      }),
      catchError(err => {
        return throwError(() => new Error(`Error al intentar actualizar la categoría: ${err.message}`));
      })
    );
  }
}
