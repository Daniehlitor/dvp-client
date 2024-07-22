import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  register_form?: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _utils: UtilsService,
    private _router: Router,
    private _http: HttpService
  ) {}

  async ngOnInit() {
    const user = await this._http.current_user;
    this.register_form = this._fb.group({
      documento: new FormControl({
        value: `${user.tipo_documento}${user.numero_documento}`,
        disabled: true,
      }),
      nombres: new FormControl({ value: `${user.nombres} ${user.apellidos}`, disabled: true }),
      email: new FormControl({ value: `${user.email}`, disabled: true }),
      date: new FormControl({ value: this._utils.getDateString(user.fecha_creacion), disabled: true }),
    });
  }

  onSubmit() {
    console.log(this.register_form?.value);
    localStorage.clear();
    this._router.navigate(['login']);
  }
}
