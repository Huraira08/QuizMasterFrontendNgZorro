import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user!: User
  showNavBar: boolean = true;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next:isLoggedIn=>{
        this.isLoggedIn = isLoggedIn;
        // console.log())
        if(this.isLoggedIn){
          this.user = JSON.parse(localStorage.getItem("user")!)
          this.isAdmin = this.authService.isAdmin();
          console.log(this.user.name)
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  toggleNavBar(component: Component){
    if(component instanceof LoginPageComponent || component instanceof SignupPageComponent){
      this.showNavBar = false;
    }else{
      this.showNavBar = true;
    }
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigateToLanding(){
    this.router.navigate(['landing-page']);
  }
}
