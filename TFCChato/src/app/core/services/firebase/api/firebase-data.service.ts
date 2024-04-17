import { Observable, from, map, switchMap } from "rxjs";
import { FirebaseService } from "../../firebase/firebase.service";
import { PaginatedData } from "src/app/core/interfaces/data";
import { DataService } from "../../data.service";

export class FirebaseDataService extends DataService{

    /**
    * Constructs the FirebaseDataService with a reference to FirebaseService.
    * This service handles all interactions with Firebase, providing methods to get, create, update,
    * and delete documents in a Firestore database.
    * @param {FirebaseService} firebase - A service that provides methods for interacting with Firebase.
    */
    constructor(
        protected firebase:FirebaseService
    ){
        super();
    }

    /**
     * Fetches a collection of documents from Firebase and maps them to a PaginatedData structure.
     * This method is generic and can be used for any type of collection.
     * @param {string} resource - The name of the Firestore collection to query.
     * @param {any} params - Query parameters (currently not used in implementation but can be utilized for filtering/sorting).
     * @returns {Observable<PaginatedData<T>>} - An observable that emits the paginated data of the specified type.
     */
    public query<T>(resource:string, params:any):Observable<PaginatedData<T>>{
        return from(this.firebase.getDocuments(resource)).pipe(map(data=>{
            return {
                data:data.map(doc=>{
                return {
                    id:0,
                    uuid: doc.id,
                    ...doc.data
                    } as T
            }),
            pagination:{
                page:0,
                pageSize:data.length,
                pageCount:1,
                total:data.length
            }
            }
        }));
    }
    
    /**
     * Retrieves a single document from Firebase based on a resource path which includes collection name and document ID.
     * Maps the Firestore document to a generic type T.
     * @param {string} resource - The path to the document, formatted as 'collectionName/documentId'.
     * @returns {Observable<T>} - An observable that emits the requested document as type T.
     */
    public get<T>(resource:string):Observable<T>{
        return from(this.firebase.getDocument(resource.split('/')[0], resource.split('/')[1])).pipe(map(doc=>{
            return {
            id: 0,
            uuid: doc.id,
            ...doc.data
            } as T;
        }));
    }
    
    /**
    * Creates a new document in a specified Firebase collection and retrieves the newly created document.
    * @param {string} resource - The name of the Firestore collection where the document will be created.
    * @param {any} data - The data to be stored in the new document.
    * @returns {Observable<T>} - An observable that emits the newly created document as type T, after fetching it using its ID.
    */
    public post<T>(resource:string, data:any):Observable<T>{
        return from(this.firebase.createDocument(resource, data)).pipe(switchMap(doc=>this.get<T>(resource+"/"+doc)));
    }

    /**
    * Updates an existing document in Firebase and retrieves the updated document.
    * Assumes the resource string is formatted as 'collectionName/documentId'.
    * @param {string} resource - The path to the document, which is split to get collection name and document ID.
    * @param {any} data - The new data for the document.
    * @returns {Observable<T>} - An observable that emits the updated document as type T.
    */
    public put<T>(resource:string, data:any):Observable<T>{
        return from(this.firebase.updateDocument(resource.split("/")[0],resource.split("/")[1], data)).pipe(switchMap(doc=>this.get<T>(resource)));
    }
    
    /**
    * Deletes a document from Firebase and returns the document that was deleted.
    * Retrieves the document first, then deletes it from Firestore, emitting the original document upon completion.
    * @param {string} resource - The path to the document, formatted as 'collectionName/documentId'.
    * @returns {Observable<T>} - An observable that emits the document that was deleted as type T.
    */
    public delete<T>(resource:string):Observable<T>{
        return this.get<T>(resource).pipe(switchMap(doc=>{
            return from(this.firebase.deleteDocument(resource.split("/")[0],resource.split("/")[1])).pipe(map(_=>doc));
        }));
        
    }
}
