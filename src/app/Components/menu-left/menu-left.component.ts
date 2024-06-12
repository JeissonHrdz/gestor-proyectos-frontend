import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectsComponent } from "../proyects/proyects.component";
import { MenuLeftService } from '../../Service/menu-left.service';
import { ProyectDetailsService } from '../../Service/proyect-details.service';

@Component({
    selector: 'app-menu-left',
    standalone: true,
    templateUrl: './menu-left.component.html',
    styleUrl: './menu-left.component.css',
    imports: [CommonModule, FormsModule, RouterLink, ProyectsComponent]
})
export class MenuLeftComponent {

    loadProyects: boolean = false;

    private menuLeftService = inject(MenuLeftService)
    private proyectDetailsService = inject(ProyectDetailsService)

    loadProyectComponent() {
        this.menuLeftService.loadPageProyects.next(true);
        this.proyectDetailsService.proyectDetails.next(false);
    }

}
