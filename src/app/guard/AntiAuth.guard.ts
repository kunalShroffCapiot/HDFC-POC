import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AntiAuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtHelper.isTokenExpired()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
