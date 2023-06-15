import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environments';
import { Book } from '../models/book.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get currentToken(): any {
    return sessionStorage.getItem('token');
  }
  constructor(private readonly _httpClient: HttpClient) { }

  public login(user: any): Observable<any[]>{
    
    const url: string = environment.API_REST_URL + `/user`;
    return this._httpClient.get<Book[]>(url).pipe( map ((resp: any)=>{
      const usuario:  any[]=[];
      sessionStorage.clear();
      const result = resp.filter((x: { name: string; password: string; }) => x.name === user.name && x.password === user.password);
      if(result.length === 1){
         sessionStorage.setItem('token',
         'eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiYWRsZXIiLCJyb2xlcyI6WyJBZG1pbiJdLCJzdGF0dXMiOjIwMCwiZXhwIjo5Njg3MjA2MDMzfQ.MIJ1w6aby7t0h51c77aA9SYOCJjwbR5SxvSimBTTjwc');
        // sessionStorage.setItem('token',
        // 'eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiYWRsZXIiLCJyb2xlcyI6WyJVc3VhcmlvIl0sInN0YXR1cyI6MjAwLCJleHAiOjk2ODcyMDYwMzN9.MCWfUod4qM47H_TfJigu0T0W92ZtpTiEl0_shFCFPIU');
        
        const perfiles = this.perfiles();
        usuario.push(perfiles)
      }else{
        const dato={
          status:500,
          messaje:'Usuario Incorrecto'
        }
        usuario.push(dato)
      }
      return usuario;
     })
    );
    // return this.http.post("https://reqres.in/api/login", user);
    
  }

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
    let rol = this.parseJwt().roles.toString();
    sessionStorage.setItem('rol', rol);
      return mensaje;
    }
  }
}
