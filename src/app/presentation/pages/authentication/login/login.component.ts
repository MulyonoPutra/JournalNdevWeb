import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/domain/dto/login';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public isLoggedIn = false;

  public isLoginFailed = false;

  public loginDto!: Login;

  public username!: string;

  public password!: string;

  public errorMessage!: string;

  public roles: string[] = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private utils: UtilityService
  ) {}

  ngOnInit() {
    this.getUserToken();
    this.utils.setSpinner();
  }

  getUserToken() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['/']);
    }
  }

  onLogin(): void {
    this.loginDto = new Login(this.username, this.password);
    this.authService.login(this.loginDto).subscribe(
      (data) => {
        this.isLoggedIn = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
        this.autoReload();
      },
      (err) => {
        this.isLoggedIn = false;
        this.errorMessage = err.error.message;
        this.failed();
      }
    );
  }

  autoReload() {
    window.location.reload();
  }

  failed() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid username or password',
    });
  }
}
