import { Component, inject, Input } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MenuLeftComponent } from "../menu-left/menu-left.component";
import { ProjectsComponent } from "../proyects/projects.component";
import { CommonModule } from '@angular/common';
import { MenuLeftService } from '../../Service/menu-left.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, MenuLeftComponent, ProjectsComponent, CommonModule]
})
export class DashboardComponent {

    private menuLeftService = inject(MenuLeftService)
    loadProjects?: boolean;
    constructor() { }

    ngOnInit() {
        this.menuLeftService.loadPageProjects.subscribe(data => {
            this.loadProjects = data;
        });
    }






}
