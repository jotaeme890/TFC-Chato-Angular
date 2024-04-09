import { Observable, from, map, switchMap } from "rxjs";
import { FirebaseService } from "../../firebase/firebase.service";
import { PaginatedData } from "src/app/core/interfaces/data";
import { DataService } from "../../data.service";

export class FirebaseDataService extends DataService{

    constructor(
        protected firebase:FirebaseService
    ){
        super();
    }


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
    
    public get<T>(resource:string):Observable<T>{
        return from(this.firebase.getDocument(resource.split('/')[0], resource.split('/')[1])).pipe(map(doc=>{
            return {
            id: 0,
            uuid: doc.id,
            ...doc.data
            } as T;
        }));
    }
    
    public post<T>(resource:string, data:any):Observable<T>{
        return from(this.firebase.createDocument(resource, data)).pipe(switchMap(doc=>this.get<T>(resource+"/"+doc)));
    }
    
    public put<T>(resource:string, data:any):Observable<T>{
        return from(this.firebase.updateDocument(resource.split("/")[0],resource.split("/")[1], data)).pipe(switchMap(doc=>this.get<T>(resource)));
    }
    
    public delete<T>(resource:string):Observable<T>{
        return this.get<T>(resource).pipe(switchMap(doc=>{
            return from(this.firebase.deleteDocument(resource.split("/")[0],resource.split("/")[1])).pipe(map(_=>doc));
        }));
        
    }
}
