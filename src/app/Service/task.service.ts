import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../Model/task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SprintService } from './sprint.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private sprintService = inject(SprintService);;

  private urlBase: string = 'http://localhost:8080/app';
  
  constructor() {}

  newTask(task: Task): Observable<Task> {  

    let idProyect = 0;
    this.sprintService.idProyect.subscribe((data) => {
      idProyect = data;
    }); 
    console.log(JSON.stringify(task));
    return this.http
      .post<Task>(
        `${this.urlBase}/proyect/${idProyect}/sprints/task`,
        task
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
