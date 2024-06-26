import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { CreateSprintComponent } from '../create-sprint/create-sprint.component';
import { Proyect } from '../../../Model/proyect.model';
import { ProyectDetailsService } from '../../../Service/proyect-details.service';
import { SprintService } from '../../../Service/sprint.service';
import { Sprint } from '../../../Model/sprint.model';

import 'jquery-ui/dist/jquery-ui.js';

@Component({
  selector: 'app-project-details',
  standalone: true,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
  imports: [CommonModule, CreateSprintComponent],
})
export class ProjectDetailsComponent {
  showSprintForm() {
    this.sprintServices.sprintInfo.next(true);
  }
  proyect?: Proyect;
  private proyectDetailsService = inject(ProyectDetailsService);
  private sprintServices = inject(SprintService);
  sprintInfo: boolean = false;
  sprints: Array<Sprint> = [];

  ngOnInit() {
    this.proyectDetailsService.proyectInfo.subscribe((data) => {
      this.proyect = data;
      this.sprintServices
        .listSprintByProyect(data.idProyect)
        .subscribe((data: Array<Sprint>) => {
          this.sprints = data;
        });
    });

    this.sprintServices.sprintInfo.subscribe((data) => {
      this.sprintInfo = data;
    });

 
  }

  ngAfterViewInit(): void {
   // $('#draggable1').draggable();
  }

  todo = ['Get to work', 'Pick up groceries'];

  done = ['Get up'];


}
