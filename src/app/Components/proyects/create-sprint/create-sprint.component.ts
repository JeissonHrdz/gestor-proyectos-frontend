import { Component, inject } from '@angular/core';
import { SprintService } from '../../../Service/sprint.service';
import { ProyectDetailsService } from '../../../Service/proyect-details.service';
import { Proyect } from '../../../Model/proyect.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sprint } from '../../../Model/sprint.model';

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
  sprints: Array<Sprint> = [];
  nSprint: number = 0;

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }

  constructor(private form: FormBuilder) {
    this.proyectDetailsService.proyectInfo.subscribe(async (data) => {
      this.sprintService.idProyect.next(data.idProyect);
      let numberSprint =  await this.searchSprintNumber(data.idProyect).then((data) => {
        this.nSprint = data
      })
      
      this.formSprint = this.form.group({
        idProyect: [data.idProyect, [Validators.required]],
        dateStart: ['', [Validators.required]],
        dateEnd: ['', [Validators.required]],
        number: [(this.nSprint+1)],
        dateCreation: [this.dateCreation, [Validators.required]],
      });
    });
  }

  async searchSprintNumber(idProyect: number): Promise<number> {
    // Cambiado a async
    return new Promise((resolve, reject) => {
      this.sprintService.listSprintByProyect(idProyect).subscribe(
        (data: Array<Sprint>) => {
          this.sprints = data;
          let lastSprintNumber = 0; // Asumimos un número por defecto si no hay sprints
          this.sprints.forEach((element) => {
            lastSprintNumber = element.number;
          });        
          resolve(lastSprintNumber); // Resolver la promesa con el número del sprint
        },
        (error) => {
          console.error(error);
          reject(error); // En caso de error, rechazar la promesa
        }
      );
    });
  }
  sendForm() {
    if (!this.dateStartValidator() && !this.dateEndValidator()) {
      // if (this.formSprint.valid) {
      //let token: String = this.loginService.userToken;      
      console.log( JSON.stringify(this.formSprint.value) );
      const sendForm = this.formSprint.value;
      this.sprintService.newSprint(sendForm).subscribe(() => {
        this.sprintService.sprintInfo.next(false);
        document.getElementById('btnClose')?.click()
      
       
      });
      //}
    }
  }

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
