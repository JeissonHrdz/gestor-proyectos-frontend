import { Component, inject } from '@angular/core';
import { SprintService } from '../../../Service/sprint.service';
import { ProyectDetailsService } from '../../../Service/proyect-details.service';
import { Proyect } from '../../../Model/proyect.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-sprint',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-sprint.component.html',
  styleUrl: './create-sprint.component.css',
})
export class CreateSprintComponent {
  formSprint?: FormGroup | any;

  private sprintService = inject(SprintService);
  private proyectDetailsService = inject(ProyectDetailsService);
  private objectDate: Date = new Date();
  private dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
 // proyect?: Proyect | any;
  
  
  ngOnInit(){   
  
  }
  constructor(private form: FormBuilder) { 

    this.proyectDetailsService.proyectInfo.subscribe((data) => {
      
      this.formSprint = this.form.group({    
        idProyect: [data.idProyect , [Validators.required]],
        dateStart: ['', [Validators.required]],
        dateEnd: ['', [Validators.required]],    
        number: [2],
        dateCreation: [this.dateCreation, [Validators.required]]
      });

    })

 
  }
  
  sendForm() {
    if (!this.dateStartValidator() && !this.dateEndValidator()) {
     // if (this.formSprint.valid) {
        //let token: String = this.loginService.userToken;
        this.ngOnInit();
        const sendForm = this.formSprint.value;       
        this.sprintService.newSprint(sendForm).subscribe(() => {});
      //}
    }}

  dateStartValidator() {
    let dateStartValidate: Date = new Date(this.formSprint.value.dateStart);
    let dateToday: Date = new Date();
    return dateStartValidate.getTime() < dateToday.getTime();
  }

  dateEndValidator() {
    let dateStartValidate: Date = new Date(this.formSprint.value.dateStart);
    let dateEndValidate: Date = new Date(this.formSprint.value.dateEnd);
    return dateEndValidate.getTime() < dateStartValidate.getTime();
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formSprint.get(controlName)?.hasError(errorType) &&
      this.formSprint.get(controlName)?.touched
    );
  }
}
