import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddProjectComponent } from "./add-project/add-project.component";
import { ProjectService } from '../../Service/project.service';
import { Project } from '../../Model/project.model';
import { JwtInterceptorService } from '../../Service/jwt-interceptor.service';
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ProjectDetailsService } from '../../Service/project-details.service';
import { SprintService } from '../../Service/sprint.service';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [CommonModule, AddProjectComponent, ProjectDetailsComponent]
})
export class ProjectsComponent {


    projects?: Array<Project> = [];
    private sprintService = inject(SprintService);

    projectDetails: boolean = false;
    private projectDetailsService = inject(ProjectDetailsService)
    private projectService = inject(ProjectService)
    private jwtInterceptor = inject(JwtInterceptorService);

    ngOnInit(){       
        this.getAllByUser();
        this.projectDetailsService.projectDetails.subscribe(data => {
            this.projectDetails = data;
        })

    }

    getAllByUser(){
        this.projectService.showProjectByUser(parseInt(this.jwtInterceptor.getIdFromToken()))
        .subscribe((data:Array<Project>) =>{          
             this.projects = data
            })
    } 

    getProjectDetails(idProject:number) {
        this.projectDetailsService.projectDetails.next(true);       
        this.projects?.forEach(element => {
            if(element.idProject === idProject){
                this.projectDetailsService.projectInfo.next(element);
            }
        });      
        }

}
