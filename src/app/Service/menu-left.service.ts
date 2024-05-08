import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuLeftService {

  public loadPageProyects = new BehaviorSubject<boolean>(false);

  constructor() { }
}
