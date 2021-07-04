import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTResponse } from '../domain/dto/jwt-response';
import { Login } from '../domain/dto/login';
import { Register } from '../domain/dto/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) {}

  public new(register: Register): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', register);
  }

  public login(loginDto: Login): Observable<JWTResponse> {
    return this.httpClient.post<JWTResponse>(this.authURL + 'login', loginDto);
  }
}
