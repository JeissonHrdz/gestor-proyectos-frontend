import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddProyectComponent } from "./add-proyect/add-proyect.component";
import { ProyectService } from '../../Service/proyect.service';
import { Proyect } from '../../Model/proyect.model';
import { JwtInterceptorService } from '../../Service/jwt-interceptor.service';

@Component({
    selector: 'app-proyects',
    standalone: true,
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css',
    imports: [CommonModule, AddProyectComponent]
})
export class ProyectsComponent {

    proyects?: Array<Proyect> = [];

    private proyectService = inject(ProyectService)
    private jwtInterceptor = inject(JwtInterceptorService);

    ngOnInit(){       
        this.getAllByUser();

    }

    getAllByUser(){
        this.proyectService.showProyectByUser(parseInt(this.jwtInterceptor.getIdFromToken()))
        .subscribe((data:Array<Proyect>) =>{
             console.log(data);  
             this.proyects = data
            })
    } 

}
