import { Component, inject } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private loginService = inject(LoginService);
  private router = inject(Router)
  menuState: boolean = true;

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  hideMenu() {
    if (this.menuState) {
      $(".menu").animate({width: "50px"})      
      $(".box-container").animate({width: "95%"})    
      this.menuState = false;
    } else {
      $(".menu").animate({width: "250px"})
      this.menuState = true;

    }
  }

}
