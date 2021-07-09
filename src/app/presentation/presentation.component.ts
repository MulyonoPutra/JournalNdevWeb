import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/service/token.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-presentation',
  template: `
    <app-navbar></app-navbar>
    <router-outlet>
      <ngx-spinner
        bdColor="rgba(51,51,51,0.8)"
        size="medium"
        color="#fff"
        type="ball-scale-multiple"
      >
        <p style="font-size: 20px; color: rgb(255, 255, 255)">Loading...</p>
      </ngx-spinner>
    </router-outlet>
    <app-footer></app-footer>
  `,
})
export class PresentationComponent implements OnInit {
  public isLogged = false;

  public router: any;

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
