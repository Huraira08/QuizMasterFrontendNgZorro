import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  const adminRoutes = ['/admin']

  return new Observable<boolean>((observer)=>{
    authService.isLoggedIn().subscribe((loggedIn: boolean)=>{
      if(loggedIn){
        if(adminRoutes.includes(state.url)){
          if(authService.isAdmin()){
            observer.next(true);
          }else{
            observer.next(false);
          }
        }else{
          observer.next(true);
        }
      }else{
        router.navigate(['/login']);
        observer.next(false);
      }
      observer.complete();
    })
  })

  // if(authService.isLoggedIn()){
  //   if(adminRoutes.includes(state.url)){
  //     if(authService.isAdmin()){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  //   else{
  //     return true;
  //   }
  // }
  // else{
  //   router.navigate(['/']);
  //   return false;
  // }
};
