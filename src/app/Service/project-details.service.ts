import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../Model/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  project?:Project | any;
  public projectDetails = new BehaviorSubject<boolean>(false);
  public projectInfo = new BehaviorSubject<Project>(this.project);  

 
  constructor() { }
}


