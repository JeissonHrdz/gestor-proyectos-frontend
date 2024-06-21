import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Proyect } from '../Model/proyect.model';


@Injectable({
  providedIn: 'root'
})
export class ProyectDetailsService {

  proyect?:Proyect | any;
  public proyectDetails = new BehaviorSubject<boolean>(false);
  public proyectInfo = new BehaviorSubject<Proyect>(this.proyect);  

 
  constructor() { }
}


