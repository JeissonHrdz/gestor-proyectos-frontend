import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';

import { CreateSprintComponent } from '../create-sprint/create-sprint.component';
import { Project } from '../../../Model/project.model';
import { ProjectDetailsService } from '../../../Service/project-details.service';
import { SprintService } from '../../../Service/sprint.service';
import { Sprint } from '../../../Model/sprint.model';
import { BacklogComponent } from '../backlog/backlog.component';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SprintComponent } from "../sprint/sprint.component";

@Component({
  selector: 'app-project-details',
  standalone: true,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
  imports: [CommonModule, CreateSprintComponent, BacklogComponent, SprintComponent],
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
  private unsubscribe$ = new Subject<void>();
  sprintOpen:boolean = false;
  backlogOpen:boolean = false

  ngOnInit() {
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

    this.sprintServices.sprintInfo.subscribe((data) => {
      this.sprintInfo = data;
    });
  }

  openMenu(id: any) {
    $('.menu-project').removeClass('menu-project-focus');
    $(`#${id}`).addClass('menu-project-focus');
    if (id == 'sprintItem') {
      this.sprintOpen = true;
      this.backlogOpen = false
      $('.i-sprint').addClass('i-sprint-focus');
      $('.i-backlog').removeClass('i-backlog-focus');
      $('.i-resume').removeClass('i-resume-focus');
    } else if (id == 'backlogItem') {
      this.backlogOpen = true;
      this.sprintOpen = false;
      $('.i-backlog').addClass('i-backlog-focus');
      $('.i-sprint').removeClass('i-sprint-focus');
      $('.i-resume').removeClass('i-resume-focus');
    } else if (id == 'resumeItem') {
      $('.i-resume').addClass('i-resume-focus');
      $('.i-sprint').removeClass('i-sprint-focus');
      $('.i-backlog').removeClass('i-backlog-focus');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  todo = ['Get to work', 'Pick up groceries'];

  done = ['Get up'];
}
