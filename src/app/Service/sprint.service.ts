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

  public idProyect = new BehaviorSubject<number>(0);

  newSprint(sprint: Sprint): Observable<Sprint> {    

    let idProyect = 0;
    this.idProyect.subscribe ((data) => {
      idProyect = data    
    })

    return this.http.post<Sprint>(`${this.urlBase}/proyect/` + idProyect+`/sprint`, sprint)
      .pipe(catchError(this.handleError));
  } 

  listSprintByProyect(idProyect:number):Observable<Array<Sprint>> {

    return this.http.get<Array<Sprint>>(`${this.urlBase}/proyect/${idProyect}/sprints`).pipe(
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
