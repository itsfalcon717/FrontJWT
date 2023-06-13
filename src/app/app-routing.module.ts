import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // {path:"",component:AppComponent,pathMatch:'full'},
 
  {path:"",component:LoginComponent,pathMatch:'full'},
  {path: 'home',component: HomeComponent,pathMatch:'full'},
  {path:"register",component:RegisterComponent,pathMatch:'full'},
  {path:"cart",component:CartComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
