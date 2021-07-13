import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  isLogged = false;

  constructor(
    private spinner: NgxSpinnerService,
    private tokenService: TokenService
  ) {}

  /* Function to set spinner when navigate to other page */
  setSpinner(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  checkUserToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
