import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../../Service/task.service';
import { CommonModule } from '@angular/common';

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
  private dateCreation: string = `${this.objectDate.getFullYear()}-0${this.objectDate.getMonth()}-0${this.objectDate.getDay()}`;

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
      this.taskService.newTask(sendForm).subscribe(() => {});
  } else {
    alert("error al ingresar los datos")
  }
}

hasErrors(controlName: string, errorType: string) {
  return (
    this.formTask.get(controlName)?.hasError(errorType) &&
    this.formTask.get(controlName)?.touched
  );
}
}
