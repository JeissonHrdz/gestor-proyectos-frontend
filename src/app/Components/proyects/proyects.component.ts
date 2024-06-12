import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddProyectComponent } from "./add-proyect/add-proyect.component";
import { ProyectService } from '../../Service/proyect.service';
import { Proyect } from '../../Model/proyect.model';
import { JwtInterceptorService } from '../../Service/jwt-interceptor.service';
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ProyectDetailsService } from '../../Service/proyect-details.service';

@Component({
    selector: 'app-proyects',
    standalone: true,
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css',
    imports: [CommonModule, AddProyectComponent, ProjectDetailsComponent]
})
export class ProyectsComponent {


    proyects?: Array<Proyect> = [];

    proyectDetails: boolean = false;

    private proyectDetailsService = inject(ProyectDetailsService)

    private proyectService = inject(ProyectService)
    private jwtInterceptor = inject(JwtInterceptorService);

    ngOnInit(){       
        this.getAllByUser();
        this.proyectDetailsService.proyectDetails.subscribe(data => {
            this.proyectDetails = data;
        })

    }

    getAllByUser(){
        this.proyectService.showProyectByUser(parseInt(this.jwtInterceptor.getIdFromToken()))
        .subscribe((data:Array<Proyect>) =>{          
             this.proyects = data
            })
    } 

    getProjectDetails() {
        this.proyectDetailsService.proyectDetails.next(true);        
        }

}
