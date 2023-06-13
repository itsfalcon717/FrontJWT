import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(public userService: UserService,private router: Router) {}

  login() {
    const user = { email: this.email, password: this.password};
    this.userService.login(user).subscribe((data) => {
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
          title: 'Bienvenido ' + data[0].usuario
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
