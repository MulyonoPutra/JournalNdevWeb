import { RegisterDto } from './../../models/registerDto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register?: RegisterDto;
  name: any;
  username: any;
  email: any;
  password: any;
  errMsj: any;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.register = new RegisterDto(
      this.name,
      this.username,
      this.email,
      this.password
    );
    this.authService.new(this.register).subscribe(
      (data) => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });

        this.router.navigate(['/login']);
      },
      (err) => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }
}
