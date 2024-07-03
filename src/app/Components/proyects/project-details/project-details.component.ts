import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';

import { CreateSprintComponent } from '../create-sprint/create-sprint.component';
import { Project } from '../../../Model/project.model';
import { ProjectDetailsService } from '../../../Service/project-details.service';
import { SprintService } from '../../../Service/sprint.service';
import { Sprint } from '../../../Model/sprint.model';
import { BacklogComponent } from "../backlog/backlog.component";
import { Subject, switchMap, takeUntil } from 'rxjs';


@Component({
    selector: 'app-project-details',
    standalone: true,
    templateUrl: './project-details.component.html',
    styleUrl: './project-details.component.css',
    imports: [CommonModule, CreateSprintComponent, BacklogComponent]
})
export class ProjectDetailsComponent {
  showSprintForm() {
    this.sprintServices.sprintInfo.next(true);
  }
  project?: Project;
  private projectDetailsService = inject(ProjectDetailsService);
  private sprintServices = inject(SprintService);
  sprintInfo: boolean = false;
  sprints: Array<Sprint> = [];
  private unsubscribe$ = new Subject<void>
  

  ngOnInit() {

    this.projectDetailsService.projectInfo.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((data: Project)  => {
          this.project = data;      
          return this.sprintServices.listSprintByProject(data.idProject);
      })
    ).subscribe((data: Array<Sprint>) => {
      this.sprints = data;
    }) 


    // this.projectDetailsService.projectInfo.subscribe((data) => {
    //   this.project = data;     
    //   this.sprintServices
    //     .listSprintByProject(data.idProject)
    //     .subscribe((data: Array<Sprint>) => {
    //       this.sprints = data;
    //     });
    // });

    this.sprintServices.sprintInfo.subscribe((data) => {
      this.sprintInfo = data;
    });
    
  }

 

  todo = ['Get to work', 'Pick up groceries'];

  done = ['Get up'];


}
