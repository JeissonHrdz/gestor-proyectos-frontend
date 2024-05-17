import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { Proyect } from '../Model/proyect.model';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private http = inject(HttpClient); 
  
  private jwtInterceptos  = inject(JwtInterceptorService)
  private urlBase:string = "http://localhost:8080/app";

  constructor() {}

  newProyect(proyect:Proyect):Observable<Proyect> {

    return this.http.post<Proyect>(`${this.urlBase}/proyect`, proyect).pipe(
      catchError(this.handleError))
  }

  showProyectByUser(idUser:number):Observable<Array<Proyect>> {

    return this.http.get<Array<Proyect>>(`${this.urlBase}/proyects/${idUser}`);
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

