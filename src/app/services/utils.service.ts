import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Inject, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface TipoDocumento {
  short: string;
  long: string;
}

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  tipos_documento: TipoDocumento[] = [
    { short: 'CC', long: 'Cédula de Ciudadania' },
    { short: 'TI', long: 'Tarjeta de Identidad' },
    { short: 'CE', long: 'Cédula de Extranjería' },
    { short: 'PAS', long: 'Pasaporte' },
  ];

  loading: boolean = false;

  constructor() {}

  get is_logged() {
    return this.storage?.getItem('user') ? true : false;
  }

  get storage() {
    return inject(DOCUMENT).defaultView?.localStorage;
  }

  wait(miliseconds: number = 1000) {
    return new Promise<void>((resolve) => {
      timer(miliseconds).subscribe(() => resolve());
    });
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  getDateString(date: string) {
    const date_args = date.split('T')[0].split('-');
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Noviembre',
      'Diciembre',
    ];
    const mes = meses[parseInt(date_args[1]) - 1];
    return `${date_args[2]} de ${mes} de ${date_args[0]}`
  }
}
