import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {

  public isLogged = false;

  constructor(protected tokenService: TokenService) {}

  ngOnInit(): void {}

  getUserToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

}
