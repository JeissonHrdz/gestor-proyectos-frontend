import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../../Service/project.service';
import { JwtInterceptorService } from '../../../Service/jwt-interceptor.service';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  formProject?: FormGroup | any;

  private projectService = inject(ProjectService);
  private jwtInterceptor = inject(JwtInterceptorService);
  private objectDate: Date = new Date();
  private dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
  private loginService = inject(LoginService);


  constructor(private form: FormBuilder) {
    this.formProject = this.form.group({
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
      if (this.formProject.valid) {
        let token: String = this.loginService.userToken;
        const sendForm = this.formProject.value;
        this.projectService.newProject(sendForm).subscribe(() => {});
      }
    }
  }

  dateStartValidator() {
    let dateStartValidate: Date = new Date(this.formProject.value.dateStart);
    let dateToday: Date = new Date();
    return (dateStartValidate.getTime() < dateToday.getTime())    
  }

  dateEndValidator() {
    let dateStartValidate: Date = new Date(this.formProject.value.dateStart);
    let dateEndValidate: Date = new Date(this.formProject.value.dateEnd);
    return ( dateEndValidate.getTime() < dateStartValidate.getTime())
    
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formProject.get(controlName)?.hasError(errorType) &&
      this.formProject.get(controlName)?.touched
    );
  }
}
