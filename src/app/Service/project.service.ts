import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { Project } from '../Model/project.model';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient); 
  
  private jwtInterceptos  = inject(JwtInterceptorService)
  private urlBase:string = "http://localhost:8080/app";

  constructor() {}

  newProject(project:Project):Observable<Project> {

    return this.http.post<Project>(`${this.urlBase}/project`, project).pipe(
      catchError(this.handleError))
  }

  showProjectByUser(idUser:number):Observable<Array<Project>> {

    return this.http.get<Array<Project>>(`${this.urlBase}/projects/${idUser}`).pipe(
      catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}

