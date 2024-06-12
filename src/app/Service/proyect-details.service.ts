import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectDetailsService {

  public proyectDetails = new BehaviorSubject<boolean>(false);

  constructor() { }
}
