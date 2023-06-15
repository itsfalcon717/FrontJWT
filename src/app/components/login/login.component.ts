import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = "";
  password: string = "";
  constructor(public _authService: AuthService,private router: Router) {}

  login() {
    const user = { name: this.name, password: this.password};
    this._authService.login(user).subscribe((data) => {
      console.log(data);
      if(data[0].status ===200){
        this.router.navigate(['/home']);
        const Toast = swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Bienvenido ' + user.name
        });
      }else{
        const Toast = swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'error',
          title: 'No se encontro Usuario'
        });
      }
    });
  }
}
