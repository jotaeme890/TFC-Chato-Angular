import { Injectable, OnInit } from '@angular/core';
import { CustomTranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService{
  browserLanguage: string = "";

  constructor(
    private lang: CustomTranslateService
  ) {
    // window.navigator.language returns 'es-ES', we only need 'es'
    this.browserLanguage = window.navigator.language.split('-')[0];
    this.lang.use(this.browserLanguage)
  }
}