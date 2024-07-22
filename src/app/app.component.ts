import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public _utils: UtilsService){
    const encrypted = btoa("daaljeba12");
    const dencrypted = atob(encrypted);
    console.log(encrypted, dencrypted);
  }
}
