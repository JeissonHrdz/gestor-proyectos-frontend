import { Component } from '@angular/core';
import { AddTaskComponent } from "./add-task/add-task.component";

@Component({
    selector: 'app-backlog',
    standalone: true,
    templateUrl: './backlog.component.html',
    styleUrl: './backlog.component.css',
    imports: [AddTaskComponent]
})
export class BacklogComponent {

}
