import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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

  constructor(private form: FormBuilder) {
    this.formUser = this.form.group({
      name: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      password: [''],
      confPassword: [''],
    });
  }

  sendForm() {
    this.user = new User(      
      this.formUser.get('name'),
      this.formUser.get('lastName'),
      this.formUser.get('email'),
      this.formUser.get('phone'),
      0,
      this.formUser.get('password')
    );
    console.log(this.user)
    this.userService.newUser(this.user)
    .subscribe(() =>{
      console.log("exito");
    })
  }
}
