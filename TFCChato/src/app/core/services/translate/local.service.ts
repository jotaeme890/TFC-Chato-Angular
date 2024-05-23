import { Injectable, OnInit } from '@angular/core';
import { CustomTranslateService } from './translate.service';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  browserLanguage: string = '';

  /**
   * The constructor function sets the browser language based on the value returned by
   * window.navigator.language.
   * @param {CustomTranslateService} lang - The `lang` parameter in the constructor is a private
   * property of type `CustomTranslateService`. It is used to handle language translation within the
   * component or service where this constructor is defined.
   */
  constructor(private lang: CustomTranslateService) {
    // window.navigator.language returns 'es-ES', we only need 'es'
    this.browserLanguage = window.navigator.language.split('-')[0];
    this.lang.use(this.browserLanguage);
  }
}
