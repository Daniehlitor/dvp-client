import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  tipo_documento: string;
  numero_documento: number;
  fecha_creacion: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  request(method: 'GET' | 'POST', path: string, body?: any, params?: any) {
    const uri = `https://localhost:7265/api/${path}`;
    return new Promise<any>((resolve, reject) => {
      let request: Observable<any>;
      switch (method) {
        case 'GET':
          request = this._http.get(uri, { params });
          break;
        case 'POST':
          request = this._http.post(uri, body, { params });
          break;
      }
      request.subscribe({
        next: (res) => resolve(res),
        error: (error) => reject(error),
      });
    });
  }

  get current_user(): Promise<Persona> {
    return this.request('GET', `get_persona/${localStorage.getItem('user')}`);
  }

  get personas(): Promise<Persona[]> {
    return this.request('GET', 'get_personas');
  }

  async userExist(tipo_documento: string, numero_documento: number) {
    const res = await this.request('POST', 'has_password', {
      tipo_documento,
      numero_documento,
    });
    return res;
  }

  async onRegistrarPersona(
    nombres: string,
    apellidos: string,
    tipo_documento: string,
    numero_documento: number,
    email: string
  ) {
    const res = await this.request('POST', 'create_persona', {
      nombres,
      apellidos,
      tipo_documento,
      numero_documento,
      email,
    });
    console.log(res);
    return res;
  }

  async onRegistrarUsuario(
    nombres: string,
    apellidos: string,
    tipo_documento: string,
    numero_documento: number,
    email: string,
    password: string
  ) {
    const res = await this.request(
      'POST',
      'new_user',
      { nombres, apellidos, tipo_documento, numero_documento, email },
      { password: btoa(password) }
    );
    console.log(res);
    return res;
  }

  async login(
    tipo_documento: string,
    numero_documento: string,
    password: string
  ) {
    const res = await this.request('POST', 'login', {
      tipo_documento,
      numero_documento,
      password: btoa(password),
    });
    console.log(res);
    return res;
  }

  async setPassword(
    tipo_documento: string,
    numero_documento: string,
    password: string
  ) {
    const res = await this.request('POST', 'set_password', {
      tipo_documento,
      numero_documento,
      password: btoa(password),
    });
    console.log(res);
    return res;
  }
}
