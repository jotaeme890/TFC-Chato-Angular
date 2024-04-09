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

    constructor(
        private  firebase: FirebaseService
    ){
        super();
    }

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