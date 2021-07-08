import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  
  isLogged = false;

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.getUserToken();
  }

  getUserToken() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
