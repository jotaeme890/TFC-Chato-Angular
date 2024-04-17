import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class MediaService {

    /**
    * Uploads a media blob.
    * @param {Blob} blob - The blob representing the media to upload.
    * @returns {Observable<any[]>} Observable emitting the result of the upload process.
    */
    public abstract upload(blob:Blob):Observable<any[]>;
}