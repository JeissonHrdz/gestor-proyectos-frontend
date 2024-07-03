import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuLeftService {

  public loadPageProjects = new BehaviorSubject<boolean>(false);

  constructor() { }
}
