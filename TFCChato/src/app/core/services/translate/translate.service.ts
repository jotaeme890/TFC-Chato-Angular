
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  /**
   * The constructor initializes the TranslateService and calls the init() method.
   * @param {TranslateService} translate - The `translate` parameter is an instance of the
   * `TranslateService` class, which is likely used for handling translations in the application.
   */
  constructor(
    private translate:TranslateService
  ) { 
    this.init();
  }

  /**
   * The `init` function initializes language settings by adding languages and setting a default
   * language.
   */
  private async init(){
    this.translate.addLangs(['es','en']);
    this.translate.setDefaultLang(this._language.value);
  }

  /**
   * The function `use` in TypeScript sets the language for translation and updates the language
   * subject accordingly.
   * @param {string} language - The `use` function takes a `language` parameter, which is a string
   * representing the language to be used for translation.
   */
  use(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }

  /**
   * The function `get` returns an Observable that retrieves a translated string based on a given key.
   * @param {string} key - The `key` parameter is a string that represents the key used to retrieve a
   * translation value from the translation service.
   * @returns An Observable of type string is being returned.
   */
  get(key:string):Observable<string>{
    return this.translate.get(key);
  }
}
