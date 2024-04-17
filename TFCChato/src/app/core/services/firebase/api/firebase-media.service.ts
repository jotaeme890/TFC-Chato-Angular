import { Observable } from "rxjs";
import { FirebaseService } from "../../firebase/firebase.service";
import { MediaService } from "../../media.service";

export interface Media{
  id:number,
  url_small:string,
  url_medium:string,
  url_large:string,
  url_thumbnail:string
}

export class FirebaseMediaService extends MediaService{

    /**
    * Constructs the FirebaseMediaService with a reference to FirebaseService.
    * This service will be used to interact with Firebase's functionalities, particularly for uploading images.
    * @param {FirebaseService} firebase - A service that provides methods for interacting with Firebase.
    */
    constructor(
        private  firebase: FirebaseService
    ){
        super();
    }

    /**
    * Uploads a blob (file data) to Firebase storage and returns an observable that emits an array of Media objects.
    * The method is designed to handle the upload process asynchronously and emit the result as an array of Media.
    * Each Media object contains various URLs pointing to the same file, representing different resolutions or thumbnails.
    * 
    * @param {Blob} blob - The file data to be uploaded, typically an image file.
    * @returns {Observable<Media[]>} - An observable that emits an array containing the uploaded media information. 
    * If an error occurs during upload, the observable will emit an error.
    */
    public upload(blob:Blob):Observable<Media[]>{
        return new Observable(obs=>{
            this.firebase.imageUpload(blob).then(data=>{
            var imgs = [];
            var media:Media= {
                id:0,
                url_large:data.file,
                url_medium:data.file,
                url_thumbnail:data.file,
                url_small:data.file
            };
            imgs.push(media);
            obs.next(imgs);
            }).catch(error=>obs.error(error))
        });
    }
}