import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CreateSprintComponent } from "../create-sprint/create-sprint.component";
import { Proyect } from '../../../Model/proyect.model';
import { ProyectDetailsService } from '../../../Service/proyect-details.service';


@Component({
    selector: 'app-project-details',
    standalone: true,
    templateUrl: './project-details.component.html',
    styleUrl: './project-details.component.css',
    imports: [CommonModule, CdkDropList, CdkDrag, CreateSprintComponent]
})
export class ProjectDetailsComponent {

  proyect?:Proyect;
  private proyectDetailsService = inject(ProyectDetailsService);

  ngOnInit(){
    
  this.proyectDetailsService.proyectInfo.subscribe(data => {
    this.proyect = data
  });
   
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
