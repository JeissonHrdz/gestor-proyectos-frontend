import { Component, inject, Input } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MenuLeftComponent } from "../menu-left/menu-left.component";
import { ProyectsComponent } from "../proyects/proyects.component";
import { CommonModule } from '@angular/common';
import { MenuLeftService } from '../../Service/menu-left.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, MenuLeftComponent, ProyectsComponent, CommonModule]
})
export class DashboardComponent {

    private menuLeftService = inject(MenuLeftService)
    loadProyects?: boolean;
    constructor() { }

    ngOnInit() {
        this.menuLeftService.loadPageProyects.subscribe(data => {
            this.loadProyects = data;
        });
    }






}
