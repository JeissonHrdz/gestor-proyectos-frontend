import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProyectService } from '../../../Service/proyect.service';
import { JwtInterceptorService } from '../../../Service/jwt-interceptor.service';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-add-proyect',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-proyect.component.html',
  styleUrl: './add-proyect.component.css',
})
export class AddProyectComponent {
  formProyect?: FormGroup | any;

  private proyectService = inject(ProyectService);
  private jwtInterceptor = inject(JwtInterceptorService);
  private objectDate: Date = new Date();
  private dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
  private loginService = inject(LoginService);


  constructor(private form: FormBuilder) {
    this.formProyect = this.form.group({
      name: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      idUser: [
        '' + this.jwtInterceptor.getIdFromToken(),
        [Validators.required],
      ],
      dateCreation: ['' + this.dateCreation, [Validators.required]],
    });
  }

  sendForm() {
    if (!this.dateStartValidator() && !this.dateEndValidator()) {
      if (this.formProyect.valid) {
        let token: String = this.loginService.userToken;
        const sendForm = this.formProyect.value;
        this.proyectService.newProyect(sendForm).subscribe(() => {});
      }
    }
  }

  dateStartValidator() {
    let dateStartValidate: Date = new Date(this.formProyect.value.dateStart);
    let dateToday: Date = new Date();
    return (dateStartValidate.getTime() < dateToday.getTime())    
  }

  dateEndValidator() {
    let dateStartValidate: Date = new Date(this.formProyect.value.dateStart);
    let dateEndValidate: Date = new Date(this.formProyect.value.dateEnd);
    return ( dateEndValidate.getTime() < dateStartValidate.getTime())
    
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formProyect.get(controlName)?.hasError(errorType) &&
      this.formProyect.get(controlName)?.touched
    );
  }
}
