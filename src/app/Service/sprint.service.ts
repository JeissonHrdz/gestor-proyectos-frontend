import { inject, Injectable } from '@angular/core';
import { Sprint } from '../Model/sprint.model';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private jwtInterceptos = inject(JwtInterceptorService);
  private urlBase: string = 'http://localhost:8080/app';
  private http = inject(HttpClient);

  constructor() {}

  public idProject = new BehaviorSubject<number>(0);
  public sprintInfo = new BehaviorSubject<boolean>(false); 

  newSprint(sprint: Sprint): Observable<Sprint> {    

    let idProject = 0;
    this.idProject.subscribe ((data) => {
      idProject = data    
    })

    return this.http.post<Sprint>(`${this.urlBase}/project/` + idProject+`/sprint`, sprint)
      .pipe(catchError(this.handleError));
  } 

  listSprintByProject(idProject:number):Observable<Array<Sprint>> {

    return this.http.get<Array<Sprint>>(`${this.urlBase}/project/${idProject}/sprints`).pipe(
      catchError(this.handleError));
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
