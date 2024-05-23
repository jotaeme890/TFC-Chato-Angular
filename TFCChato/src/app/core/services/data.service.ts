import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from '../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export abstract class DataService {
  /**
   * Executes a query operation on a resource.
   * @param {string} resource - The resource to query.
   * @param {any} params - Parameters for the query.
   * @returns {Observable<PaginatedData<T>>} Observable emitting the paginated data resulting from the query.
   */
  public abstract query<T>(
    resource: string,
    params: any
  ): Observable<PaginatedData<T>>;

  /**
   * Retrieves a single item from a resource.
   * @param {string} resource - The resource to retrieve the item from.
   * @returns {Observable<T>} Observable emitting the retrieved item.
   */
  public abstract get<T>(resource: string): Observable<T>;

  /**
   * Creates a new item on a resource.
   * @param {string} resource - The resource to create the item on.
   * @param {any} data - Data for creating the item.
   * @returns {Observable<T>} Observable emitting the created item.
   */
  public abstract post<T>(resource: string, data: any): Observable<T>;

  /**
   * Updates an existing item on a resource.
   * @param {string} resource - The resource to update the item on.
   * @param {any} data - Data for updating the item.
   * @returns {Observable<T>} Observable emitting the updated item.
   */
  public abstract put<T>(resource: string, data: any): Observable<T>;

  /**
   * Deletes an item from a resource.
   * @param {string} resource - The resource to delete the item from.
   * @returns {Observable<T>} Observable emitting the deleted item.
   */
  public abstract delete<T>(resource: string): Observable<T>;
}
