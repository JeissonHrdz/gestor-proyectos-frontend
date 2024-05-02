import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MenuLeftComponent } from "../menu-left/menu-left.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, MenuLeftComponent]
})
export class DashboardComponent {

}
