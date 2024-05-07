import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MenuLeftComponent } from "../menu-left/menu-left.component";
import { ProyectsComponent } from "../proyects/proyects.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, MenuLeftComponent, ProyectsComponent,CommonModule]
})
export class DashboardComponent {

}
