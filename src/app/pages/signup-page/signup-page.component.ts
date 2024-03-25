import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  userForm!: FormGroup;
  user!: User;
  signingIn = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    })
  }

  submitForm(){
    if(this.userForm.valid){
      this.signingIn = true;
      this.user = this.userForm.value;
      this.authService.RegisterUser(this.user).subscribe({
        next:()=>{
          this.signingIn = false;
          this.router.navigate(['/login'])
        },
        error:()=>{
          this.signingIn = false;
          console.log('error');
        }
      });
      
      console.log(this.user);
    }
  }
}
