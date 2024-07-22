import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  login_form?: FormGroup;
  show_pass: boolean = false;
  show_pass_confirm: boolean = false;

  constructor(
    private _fb: FormBuilder,
    public _utils: UtilsService,
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit(): void {
    this.show_pass = false;
    this.login_form = this._fb.group({
      tipo_id: new FormControl('0'),
      num_id: new FormControl(),
      pass: new FormControl(),
      pass_confirm: new FormControl(),
    });
  }

  async onSubmit() {
    const values = this.login_form?.value;

    if (!this.show_pass) {
      if (!values['num_id'] || values['tipo_id'] == '0') {
        Swal.fire({
          title: 'Error',
          text: 'Debes ingresar todos los datos',
          icon: 'error',
        });
        return;
      }

      this._utils.showLoader();
      const res = await this._http.userExist(
        values['tipo_id'],
        values['num_id']
      );
      if (!res) {
        Swal.fire({
          text: 'Este usuario no existe',
          icon: 'error',
        });
        this._utils.hideLoader();
        return;
      }

      this.show_pass = true;

      if (!res.usuario) {
        Swal.fire({
          text: 'Aun no tienes contraseña asignada. Crea una para iniciar sesión',
          icon: 'info',
        });
        this.show_pass_confirm = true;
      }

      this.login_form?.get('tipo_id')?.disable();
      this.login_form?.get('num_id')?.disable();

      this._utils.hideLoader();
      return;
    }

    const tipo_documento = this.login_form?.get('tipo_id')?.value;
    const numero_documento = this.login_form?.get('num_id')?.value;

    if (this.show_pass_confirm) {
      if (values['pass'] != values['pass_confirm']) {
        Swal.fire({
          text: 'Las contraseñas deben ser iguales',
          icon: 'error',
        });
        return;
      }

      const res = await this._http.setPassword(
        tipo_documento,
        numero_documento,
        values['pass']
      );
      
      localStorage.setItem('user', res.id);
      this._router.navigate(['profile']);

      return;
    }

    const res = await this._http.login(
      tipo_documento,
      numero_documento,
      values['pass']
    );

    if (!res) {
      Swal.fire({
        text: 'Contraseña incorrecta',
        icon: 'error',
      });
      return;
    }
    localStorage.setItem('user', res.id);
    this._router.navigate(['profile']);
  }
}
