import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { MenuLeftComponent } from './Components/menu-left/menu-left.component';
import { LoginComponent } from './Components/login/login.component';
import { FormregisterComponent } from './Components/formregister/formregister.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, MenuLeftComponent, LoginComponent, FormregisterComponent]
})
export class AppComponent {
  title = 'proyect-manager-frontend';
}
