import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { HttpService, Persona } from '../../services/http.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss',
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];

  constructor(public _utils: UtilsService, private _http: HttpService) {}

  async ngOnInit() {
    this.personas = await this._http.personas;
    console.log(this.personas)
  }
}
