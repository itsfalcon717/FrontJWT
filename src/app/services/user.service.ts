import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {  HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environments';
import { Book } from '../models/book.models';
import { delay, map } from 'rxjs/operators';
import { AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private readonly _httpClient: HttpClient,private _auth:AuthService) {}

  public login(user: any): Observable<any[]>{
    
    const url: string = environment.API_REST_URL + `/user`;
    return this._httpClient.get<Book[]>(url).pipe( map ((resp: any)=>{
      const usuario:  any[]=[];
      sessionStorage.clear();
      const result = resp.filter((x: { name: string; password: string; }) => x.name === user.email && x.password === user.password);
      if(result.length === 1){
        sessionStorage.setItem('token',
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjoiYWRsZXIiLCJyb2xlcyI6WyJBZG1pbiJdLCJzdGF0dXMiOjIwMCwiZXhwIjo5Njg3MjA2MDMzfQ.MIJ1w6aby7t0h51c77aA9SYOCJjwbR5SxvSimBTTjwc');
        const perfiles = this._auth.perfiles();
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
}
