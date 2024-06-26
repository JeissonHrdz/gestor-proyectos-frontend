import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MenuLeftComponent } from './Components/menu-left/menu-left.component';
import { LoginComponent } from './Components/login/login.component';
import { FormregisterComponent } from './Components/formregister/formregister.component';
import { LoginService } from './Service/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailsComponent } from './Components/proyects/project-details/project-details.component';
import { BacklogComponent } from './Components/proyects/backlog/backlog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MenuLeftComponent,
    LoginComponent,
    FormregisterComponent,
    CommonModule,
    HttpClientModule,
    ProjectDetailsComponent,
    BacklogComponent
  ],
})
export class AppComponent {
  title = 'proyect-manager-frontend';
}
