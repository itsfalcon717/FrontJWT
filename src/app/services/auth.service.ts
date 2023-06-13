import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get currentToken(): any {
    return sessionStorage.getItem('token');
  }
  constructor() { }

  parseJwt() {
    if (this.currentToken != undefined && this.currentToken != null && this.currentToken != '') {
    var base64Url = this.currentToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  };

  perfiles(){
    if (this.currentToken != undefined && this.currentToken != null && this.currentToken != '') {
    let mensaje = this.parseJwt();
      return mensaje;
    }
  }
}
