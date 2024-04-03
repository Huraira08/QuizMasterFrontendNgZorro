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
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){
    this.userForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    })
  }

  async submitForm(){
    if(this.userForm.valid){
      this.loggingIn = true;
      this.user = this.userForm.value;
      this.errorMessage = '';
      try{
        const response = await this.authService.login(this.user)
        this.authService.setToken(response!.token, response!.user);
        this.invalidCredentials = false;
        this.loggingIn = false;
        this.router.navigate(['/landing-page']);
      }
      catch(err){
        this.invalidCredentials = true;
        this.loggingIn = false;
        console.log(err);
        this.errorMessage = "Invalid credentials";
      }

      // .subscribe({
      //   next:response=>{
      //     this.authService.setToken(response.token, response.user);
      //     this.invalidCredentials = false;
      //     this.loggingIn = false;
      //     this.router.navigate(['/landing-page']);
          
      //   },
      //   error:err=>{
      //     this.invalidCredentials = true;
      //     this.loggingIn = false;
      //     console.log(err);
      //   }
      // })
    }else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
