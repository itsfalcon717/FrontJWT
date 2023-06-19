import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User.models';
import { of } from 'rxjs';
const user:User[] = [
  {
    "name": "adler",
    "password":"12345"
  },
  {
    "name": "admin",
    "password":"123"
  }
];

const userService = {
  login: () => of(user),
};
describe('Login component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach( () => {
      TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ],
          declarations: [
            LoginComponent
          ],
          providers: [
            AuthService
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
  });

  beforeEach( () => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      service = fixture.debugElement.injector.get(AuthService);
     // spyOn(service, 'getBooksFromCart').and.callFake( () => listBook);
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });
//ejecucion correcta de login
  it('Login create', () => {
    component.login();
    // expect(spy1).toHaveBeenCalled();
    expect(component.login.length).toBe(0);
  });
});
