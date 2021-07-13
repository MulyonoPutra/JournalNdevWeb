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

  isLogged = false;

  public posts: Post[] = [];

  public search: Search = new Search();

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private postService: PostRepository
  ) {}

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

  findByAuthor() {
    this.postService.search(this.search).subscribe((data) => {
      this.posts = data;
      console.log(data);
    });
  }
}
