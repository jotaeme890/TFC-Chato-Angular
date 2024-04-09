import { Component } from '@angular/core';
import { LocalService } from './core/services/translate/local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private localLang: LocalService
  ) {}
}
