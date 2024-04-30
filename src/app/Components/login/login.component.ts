import { Component, inject, Inject } from '@angular/core';
import { FormregisterComponent } from '../formregister/formregister.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LoginRequest } from '../../Model/loginRequest';
import { error } from 'jquery';
import { LoginService } from '../../Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormregisterComponent, CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  formLogin?: FormGroup | any;

  
    private router = inject(Router);
  constructor(private form: FormBuilder, private loginService:LoginService) {
    this.formLogin = this.form.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.formLogin?.controls.username;
  }

  get password() {
    return this.formLogin?.controls.password;
  }

  login() {
    if (this.formLogin.valid) {
      this.loginService.login(this.formLogin?.value as LoginRequest).subscribe({
        next: (userData:any) => {
          console.log(userData);
        },
        error: (errorData:any) => {
          console.log(errorData);
        },
        complete: () => {
          console.info('Login Completo');
          this.router.navigateByUrl('/inicio');
          this.formLogin?.reset();
        }
      });
    } else {
        this.formLogin?.markAllAsTouched();
        alert("Error al ingresar los datos")
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formLogin.get(controlName)?.hasError(errorType) &&
      this.formLogin.get(controlName)?.touched
    );
  }
}
