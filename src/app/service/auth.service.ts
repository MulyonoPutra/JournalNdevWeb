import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwtDto';
import { LoginDto } from '../models/loginDto';
import { RegisterDto } from '../models/registerDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) {}

  public new(register: RegisterDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', register);
  }

  public login(loginDto: LoginDto): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginDto);
  }
}
