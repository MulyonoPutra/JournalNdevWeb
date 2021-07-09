import { Injectable } from '@angular/core';
import { AuthConstants } from '../constants/auth.constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  roles: Array<string> = [];

  constructor() {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(AuthConstants.TOKEN_KEY);
    window.sessionStorage.setItem(AuthConstants.TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(AuthConstants.TOKEN_KEY)!;
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(AuthConstants.USERNAME_KEY);
    window.sessionStorage.setItem(AuthConstants.USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(AuthConstants.USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AuthConstants.AUTHORITIES_KEY);
    window.sessionStorage.setItem(
      AuthConstants.AUTHORITIES_KEY,
      JSON.stringify(authorities)
    );
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AuthConstants.AUTHORITIES_KEY)) {
      JSON.parse(
        sessionStorage.getItem(AuthConstants.AUTHORITIES_KEY)!
      ).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
