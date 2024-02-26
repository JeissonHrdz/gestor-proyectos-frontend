import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { User } from '../../Model/user.model';

@Component({
  selector: 'app-formregister',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formregister.component.html',
  styleUrl: './formregister.component.css',
})
export class FormregisterComponent {
  formUser: FormGroup | any;

  private userService = inject(UserService);
  private user?: User;
  private objectDate: Date = new Date();
  private dateRegiser: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
  confPasswords: boolean = true

  constructor(private form: FormBuilder) {
    this.formUser = this.form.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      dateRegister: ['' + this.dateRegiser, [Validators.required]],
      idRol: ['1', [Validators.required]],
      password: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
    });
  }

  sendForm() {
    if (this.formUser.valid) {
      if (this.formUser.get('password').value === this.formUser.get('confPassword').value) {
        this.confPasswords = true;
        const sendForm = this.formUser.value;
        this.userService.newUser(sendForm).subscribe(() => {
          console.log('exito');
        });
      } else {
        this.confPasswords = false;
      }
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formUser.get(controlName)?.hasError(errorType) &&
      this.formUser.get(controlName)?.touched
    );
  }
}
