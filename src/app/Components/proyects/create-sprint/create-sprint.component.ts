import { Component, inject } from '@angular/core';
import { SprintService } from '../../../Service/sprint.service';
import { ProyectDetailsService } from '../../../Service/proyect-details.service';
import { Proyect } from '../../../Model/proyect.model';

@Component({
  selector: 'app-create-sprint',
  standalone: true,
  imports: [],
  templateUrl: './create-sprint.component.html',
  styleUrl: './create-sprint.component.css'
})
export class CreateSprintComponent {

  private sprintService = inject(SprintService)
  private proyectDetailsService = inject(ProyectDetailsService)
  proyect?:Proyect;

  ngOnInit(){  

  this.proyectDetailsService.proyectInfo.subscribe(data => {
    this.proyect = data;
})
  }
  


}
