import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../../Service/task.service';
import { CommonModule } from '@angular/common';
import { ProyectDetailsService } from '../../../../Service/proyect-details.service';
import { SprintService } from '../../../../Service/sprint.service';
import { Proyect } from '../../../../Model/proyect.model';
import { Sprint } from '../../../../Model/sprint.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  formTask?: FormGroup | any;
  private objectDate: Date = new Date(); 
  private taskService = inject(TaskService);
  dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
  private proyectDetailsService = inject(ProyectDetailsService);
  private sprintServices = inject(SprintService);
  proyect?: Proyect;
  sprints: Array<Sprint> = [];
  idProyect: number = 0;

  ngOnInit(){
    this.proyectDetailsService.proyectInfo.subscribe((data) => {
      this.proyect = data; 
      this.idProyect = data.idProyect;    
      this.sprintServices
        .listSprintByProyect(data.idProyect)
        .subscribe((data: Array<Sprint>) => {
          this.sprints = data;
        });
    });

  }
  constructor(private form: FormBuilder) {
    this.formTask = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      idSprint: ['', [Validators.required]],
      status: ['Not started', [Validators.required]],
      dateCreation: [this.dateCreation, [Validators.required]],
    })
  }

  addTask() {
    if (this.formTask.valid) {   
      const sendForm = this.formTask.value;
      this.taskService.newTask(sendForm, this.idProyect).subscribe(() => {
        this.resetInputs();
      });
  } else {
    console.log(JSON.stringify(this.formTask.value));
   console.error("error al ingresar los datos")
  }
}

resetInputs(){
  let controlNames = ['name','description','priority','idSprint'];
  controlNames.forEach((controlName) => {
    this.formTask?.controls[controlName].reset();
  }) 
}

hasErrors(controlName: string, errorType: string) {
  return (
    this.formTask.get(controlName)?.hasError(errorType) &&
    this.formTask.get(controlName)?.touched
  );
}
}
