import { Component, inject } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from '../../../Service/task.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectDetailsService } from '../../../Service/project-details.service';
import { Project } from '../../../Model/project.model';
import { Task } from '../../../Model/task.model';
import { SprintService } from '../../../Service/sprint.service';
import { Sprint } from '../../../Model/sprint.model';

@Component({
  selector: 'app-backlog',
  standalone: true,
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css',
  imports: [AddTaskComponent],
})
export class BacklogComponent {

  private taskService = inject(TaskService);
  private projectDetailsService = inject(ProjectDetailsService);
  private sprintServices = inject(SprintService);
  private unsubscribe$ = new Subject<void>();
  tasks: Array<Task> = [];
  sprints: Array<Sprint> = [];

  ngOnInit() {
    this.projectDetailsService.projectInfo
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((data: Project) => {
          return this.taskService.listAllByProject(data.idProject);
        })
      )
      .subscribe((data: Array<Task>) => {
        this.tasks = data;
      });

    this.projectDetailsService.projectInfo
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((data: Project) => {
          return this.sprintServices.listSprintByProject(data.idProject);
        })
      )
      .subscribe((data: Array<Sprint>) => {
        this.sprints = data;
      });
  }

  changeStatus(id:number,status: string) {
    throw new Error('Method not implemented.');
    }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
