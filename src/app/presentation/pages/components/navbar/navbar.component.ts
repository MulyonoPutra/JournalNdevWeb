import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/core/domain/dto/search';
import { Post } from 'src/app/core/domain/entities/post';
import { PostRepository } from 'src/app/core/repository/post.repository';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;

  public posts: Post[] = [];

  public search: Search = new Search();

  isAdmin = false;

  roles!: string[];

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.getUserToken();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getUserToken() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
