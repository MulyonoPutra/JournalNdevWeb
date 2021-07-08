import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/service/token.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
})
export class PresentationComponent implements OnInit {

  isLogged = false;

  router: any;

  constructor(
    private tokenService: TokenService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getUserToken() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  hideButton() {
    if (this.isLogged == true) {
    }
  }
}
