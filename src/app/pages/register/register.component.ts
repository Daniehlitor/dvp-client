import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  register_form?: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _utils: UtilsService,
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit(): void {
    this.register_form = this._fb.group({
      tipo_id: new FormControl(''),
      num_id: new FormControl(),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      email: new FormControl(''),
      pass: new FormControl(''),
      pass_confirm: new FormControl(''),
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
      values['email'] == '' ||
      values['pass'] == '' ||
      values['pass_confirm'] == ''
    ) {
      Swal.fire({
        text: 'Debes ingresar todos los datos',
        icon: 'error',
      });
      return;
    }

    if (values['pass'] != values['pass_confirm']) {
      Swal.fire({
        text: 'Las contraseñas deben ser iguales',
        icon: 'error',
      });
      return;
    }

    this._utils.showLoader();
    const { id } = await this._http.onRegistrarUsuario(
      values['nombres'],
      values['apellidos'],
      values['tipo_id'],
      values['num_id'],
      values['email'],
      values['pass']
    );
    this._utils.hideLoader();

    localStorage.setItem('user', id);
    this._router.navigate(['profile']);
  }
}
