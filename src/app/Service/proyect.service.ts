import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proyect } from '../Model/proyect.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private http = inject(HttpClient); 
  private urlBase:string = "http://localhost:8080/app";

  constructor() {}

  newProyect(proyect:Proyect){
    return this.http.post<Proyect>(`${this.urlBase}/proyect`, proyect);
  }
}
