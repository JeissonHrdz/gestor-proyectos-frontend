import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectsComponent } from "../proyects/proyects.component";

@Component({
    selector: 'app-menu-left',
    standalone: true,
    templateUrl: './menu-left.component.html',
    styleUrl: './menu-left.component.css',
    imports: [CommonModule, FormsModule, RouterLink, ProyectsComponent]
})
export class MenuLeftComponent {

}
