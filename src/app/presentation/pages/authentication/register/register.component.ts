import { Register } from '../../../../core/domain/dto/register';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public register?: Register;

  public name: any;

  public username: any;

  public email: any;

  public password: any;

  public errorMessage: any;

  public isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private utils: UtilityService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
    this.utils.setSpinner();
  }

  onRegister(): void {
    this.register = new Register(
      this.name,
      this.username,
      this.email,
      this.password
    );
    this.authService.new(this.register).subscribe(
      (data) => {
        this.toastr.success('Created!', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });

        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = err.error.mensaje;
        this.toastr.error(this.errorMessage, 'Failed', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }
}
