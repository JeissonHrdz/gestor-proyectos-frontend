import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../../Service/task.service';
import { CommonModule } from '@angular/common';
import { ProjectDetailsService } from '../../../../Service/project-details.service';
import { SprintService } from '../../../../Service/sprint.service';
import { Project } from '../../../../Model/project.model';
import { Sprint } from '../../../../Model/sprint.model';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  formTask?: FormGroup | any;
  private objectDate: Date = new Date(); 
  private taskService = inject(TaskService);
  dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;
  private projectDetailsService = inject(ProjectDetailsService);
  private sprintServices = inject(SprintService);
  project?: Project;
  sprints: Array<Sprint> = [];
  projectId: number = 0;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(){
    this.projectDetailsService.projectInfo.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((data: Project)  => {
          this.project = data;
          this.projectId = data.idProject;
          return this.sprintServices.listSprintByProject(data.idProject);
      })
    ).subscribe((data: Array<Sprint>) => {
      this.sprints = data;     
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(private form: FormBuilder) {
    this.formTask = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      idSprint: ['', [Validators.required]],
      status: ['Not started', [Validators.required]],
      dateCreation: [this.dateCreation, [Validators.required]],
      idProject: ['']
    })

    console.log("this.idProject",this.projectId)
  }

  addTask() {
    if (this.formTask.valid) {   
      const sendForm = this.formTask.value;
      this.taskService.newTask(sendForm, this.projectId).subscribe(() => {       
        this.resetInputs();
      });
  } else {  
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
