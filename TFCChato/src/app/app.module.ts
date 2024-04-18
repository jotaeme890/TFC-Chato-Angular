import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { createTranslateLoader } from './core/translate/translate';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirebaseAuthService } from './core/services/firebase/api/firebase-auth.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseMediaService } from './core/services/firebase/api/firebase-media.service';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MediaService } from './core/services/media.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';
import { DataService } from './core/services/data.service';
import { HttpClientProvider } from './core/services/http/http-client.provider';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from './shared/shared.module';

import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { CapitalizeInitialPipe } from './core/pipes/capitalize-initial.pipe';
import { DividerModule } from 'primeng/divider';

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
  http:HttpClient) {
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
  declarations: [
    AppComponent,
    CapitalizeInitialPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastModule,
    SharedModule,
    DividerModule
  ],
  providers: [
    provideLottieOptions({
      player: () => player,
    }),
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