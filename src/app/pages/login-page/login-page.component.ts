import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  userForm!: FormGroup;
  user!: User;
  invalidCredentials:boolean = false;
  loggingIn = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){
    this.userForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    })
  }

  submitForm(){
    if(this.userForm.valid){
      this.loggingIn = true;
      this.user = this.userForm.value;
      this.authService.login(this.user).subscribe({
        next:response=>{
          this.authService.setToken(response.token, response.user);
          this.invalidCredentials = false;
          this.loggingIn = false;
          this.router.navigate(['/landing-page']);
          
        },
        error:err=>{
          this.invalidCredentials = true;
          this.loggingIn = false;
          console.log(err);
        }
      })
      console.log(this.user);
    }
  }
}
