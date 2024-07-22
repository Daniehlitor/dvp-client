import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-persona',
  templateUrl: './new-persona.component.html',
  styleUrl: './new-persona.component.scss',
})
export class NewPersonaComponent {
  register_form?: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _utils: UtilsService,
    private _http: HttpService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.register_form = this._fb.group({
      tipo_id: new FormControl(''),
      num_id: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      email: new FormControl(''),
    });
  }

  async onSubmit() {
    const values = this.register_form?.value;
    console.log(values);

    if (
      values['tipo_id'] == '0' ||
      !values['num_id'] ||
      values['nombres'] == '' ||
      values['apellidos'] == '' ||
      values['email'] == ''
    ) {
      Swal.fire({
        text: 'Debes ingresar todos los datos',
        icon: 'error',
      });
      return;
    }

    this._utils.showLoader();
    await this._http.onRegistrarPersona(
      values['nombres'],
      values['apellidos'],
      values['tipo_id'],
      values['num_id'],
      values['email']
    );
    this._utils.hideLoader();

    this._router.navigate(['personas']);
  }
}
