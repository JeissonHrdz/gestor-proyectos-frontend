import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../Model/loginRequest';
import { User } from '../Model/user.model';
import { error} from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  private urlBase:string = "http://localhost:8080/auth/login";

  private http = inject(HttpClient)

  constructor() { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(`${this.urlBase}`,credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(error)
    ); 
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

get userData():Observable<String>{
  return this.currentUserData.asObservable();
}
}
