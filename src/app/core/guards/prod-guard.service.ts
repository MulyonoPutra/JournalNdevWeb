import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProdGuardService implements CanActivate {

  currentRole!: string;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const expectedRole = route.data.expectedRole;
    const roles = this.tokenService.getAuthorities();
    this.currentRole = 'user';
    roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.currentRole = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRole.indexOf(this.currentRole) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
