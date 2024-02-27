import { Component } from '@angular/core';
import { FormregisterComponent } from "../formregister/formregister.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormregisterComponent, CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

     formLogin?: FormGroup|any;

    constructor(private form: FormBuilder){
        this.formLogin = this.form.group({
            email: ['',[Validators.required, Validators.email]],
            password: ['',[Validators.required]]
        });
    }

    login(){
        if(this.formLogin.valid){
            console.log("Entraste")
        }
    }

    hasErrors(controlName: string, errorType: string) {
        return (
          this.formLogin.get(controlName)?.hasError(errorType) &&
          this.formLogin.get(controlName)?.touched
        );
      }
    

}
