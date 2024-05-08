import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddProyectComponent } from "./add-proyect/add-proyect.component";

@Component({
    selector: 'app-proyects',
    standalone: true,
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css',
    imports: [CommonModule, AddProyectComponent]
})
export class ProyectsComponent {

}
