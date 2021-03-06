import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/service/token.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-presentation',
  template: `
    <app-navbar></app-navbar>
    <router-outlet class="main-wrapper">
      <ngx-spinner
        bdColor="rgba(51,51,51,0.8)"
        size="medium"
        color="#fff"
        type="ball-scale-multiple"
      >
        <p style="font-size: 20px; color: rgb(255, 255, 255)">Loading...</p>
      </ngx-spinner>
    </router-outlet>
    <app-footer class="fixed-footer"></app-footer>
  `,
  styles: [
    `
      .fixed-footer {
        width: 100%;
        bottom: -25%;
        position: relative;
        margin-top: -50px;
      }
      .main-wrapper {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class PresentationComponent implements OnInit {

  public isLoggedIn = false;

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
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
