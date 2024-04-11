import { Component } from '@angular/core';
import { LocalService } from './core/services/translate/local.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth:AuthService,
    private router:Router,
    private localLang: LocalService
  ) {
    this.auth.isLogged$.subscribe(logged=>{
      if(logged)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/access']); 
    });
  }
}
