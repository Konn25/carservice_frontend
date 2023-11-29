import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Authentication } from './authentication';

@Injectable()
export class AuthGuard {
  constructor(private Authentication: Authentication, private router: Router){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn = this.Authentication.isAuthenticated();
    if (isLoggedIn){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
};