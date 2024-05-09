import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectService } from '../../../Service/proyect.service';

@Component({
  selector: 'app-add-proyect',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-proyect.component.html',
  styleUrl: './add-proyect.component.css'
})
export class AddProyectComponent {

  formProyect?: FormGroup | any;
  private proyectService = inject(ProyectService);

  sendForm() {
    throw new Error('Method not implemented.');
    }


}
