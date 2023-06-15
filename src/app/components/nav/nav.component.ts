import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
rol:string = "";
  constructor(private router: Router) {
   let rol:any = sessionStorage.getItem('rol')?.toString();
   this.rol= rol;
  }
  onClose(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
