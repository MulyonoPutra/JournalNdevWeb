import { environment } from './../../../environments/environment';
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
  
  constructor(private httpClient: HttpClient) {}

  public new(register: Register): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseEndpoint + 'auth/register',
      register
    );
  }

  public login(loginDto: Login): Observable<JWTResponse> {
    return this.httpClient.post<JWTResponse>(
      environment.baseEndpoint + 'auth/login',
      loginDto
    );
  }
}
