import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectsComponent } from "../proyects/projects.component";
import { MenuLeftService } from '../../Service/menu-left.service';
import { ProjectDetailsService } from '../../Service/project-details.service';

@Component({
    selector: 'app-menu-left',
    standalone: true,
    templateUrl: './menu-left.component.html',
    styleUrl: './menu-left.component.css',
    imports: [CommonModule, FormsModule, RouterLink, ProjectsComponent]
})
export class MenuLeftComponent {

    loadProjects: boolean = false;

    private menuLeftService = inject(MenuLeftService)
    private projectDetailsService = inject(ProjectDetailsService)

    loadProjectComponent() {
        this.menuLeftService.loadPageProjects.next(true);
        this.projectDetailsService.projectDetails.next(false);
    }

}
