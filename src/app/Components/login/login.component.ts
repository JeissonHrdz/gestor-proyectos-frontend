import { Component } from '@angular/core';
import { FormregisterComponent } from "../formregister/formregister.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormregisterComponent, CommonModule]
})
export class LoginComponent {

}
