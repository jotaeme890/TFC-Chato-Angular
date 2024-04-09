import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirebaseAuthService } from './core/services/firebase/api/firebase-auth.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseMediaService } from './core/services/firebase/api/firebase-media.service';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MediaService } from './core/services/media.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';
import { DataService } from './core/services/data.service';
import { HttpClientProvider } from './core/services/http/http-client.provider';

export function MediaServiceFactory(
  backend:string,
  firebase:FirebaseService){
  switch(backend){
    case 'Firebase':
      return new FirebaseMediaService(firebase);
    default:
      throw new Error("Not implemented");
  }
}

export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
  backend:string,
  firebase:FirebaseService
) {
  switch(backend){
    case 'Firebase':
      return new FirebaseAuthService(firebase);
    default:
      throw new Error("Not implemented");
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    /* TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }) */],
    providers: [
      {
        provide: 'firebase-config',
        useValue: environment.firebaseConfig
      },
      {
        provide: 'backend',
        useValue:'Firebase'
      },
      { 
        provide: RouteReuseStrategy, 
        useClass: IonicRouteStrategy 
      },
      // Factories
      {
        provide: HttpClientProvider,
        deps: [HttpClient, Platform],
        useFactory: httpProviderFactory,  
      },
      {
        provide: AuthService,
        deps: ['backend', FirebaseService],
        useFactory: AuthServiceFactory,  
      },
      {
        provide: MediaService,
        deps: ['backend', FirebaseService],
        useFactory: MediaServiceFactory,  
      },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
