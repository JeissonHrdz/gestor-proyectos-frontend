import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../Service/project.service';
import { SprintService } from '../../../Service/sprint.service';
import { Project } from '../../../Model/project.model';
import { Sprint } from '../../../Model/sprint.model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectDetailsService } from '../../../Service/project-details.service';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {

  private projectDetailsService = inject(ProjectDetailsService);
  private sprintServices = inject(SprintService);
  private unsubscribe$ = new Subject<void>();
  project?: Project = undefined;
  sprints?: Array<Sprint> = [];
  done = ['Get up','Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  
  constructor(){}

  ngOnInit(){
    this.projectDetailsService.projectInfo
    .pipe(
      takeUntil(this.unsubscribe$),
      switchMap((data: Project) => {
        this.project = data;
        console.info(data.dateCreation);
        return this.sprintServices.listSprintByProject(data.idProject);
      })
    )
    .subscribe((data: Array<Sprint>) => {
      this.sprints = data;
    });
  }

}
