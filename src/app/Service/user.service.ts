import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../Model/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient); 
  private urlBase:string = "http://localhost:8080/app";

  newUser(user:User){
    return this.http.post<User>(`${this.urlBase}/user`, user);
  }

  

 
}
