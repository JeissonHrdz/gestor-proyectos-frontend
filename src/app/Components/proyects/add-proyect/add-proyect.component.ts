import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectService } from '../../../Service/proyect.service';
import { JwtInterceptorService } from '../../../Service/jwt-interceptor.service';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-add-proyect',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-proyect.component.html',
  styleUrl: './add-proyect.component.css'
})
export class AddProyectComponent {

  formProyect?: FormGroup | any;
  private proyectService = inject(ProyectService);
  private jwtInterceptor = inject(JwtInterceptorService)
  private objectDate: Date = new Date();
  private dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
private loginService = inject(LoginService) 
  constructor(private form: FormBuilder){
    this.formProyect = this.form.group({
      name: [''],
      dateStart: [''],
      dateEnd: [''],
      idUser: [''+this.jwtInterceptor.getIdFromToken()],
      dateCreation: [''+this.dateCreation]
    });
  }

  sendForm() {

    let token: String = this.loginService.userToken;
    console.log("TOKEN: "+token)
    const sendForm = this.formProyect.value;
    this.proyectService.newProyect(sendForm).subscribe(() =>{});
    }


}
