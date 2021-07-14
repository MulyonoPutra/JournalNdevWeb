import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/core/domain/dto/search';
import { Post } from 'src/app/core/domain/entities/post';
import { PostRepository } from 'src/app/core/repository/post.repository';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  public isLoggedIn = false;

  public username = '';

  public postCollection: Post[] = [];

  public post: Post;

  public search: Search = new Search();

  constructor(
    private tokenService: TokenService,
    private postService: PostRepository,
    private utils: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserToken();
    this.findAllPost();
    this.utils.setSpinner();
  }

  getUserToken(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenService.getUserName();
    } else {
      this.isLoggedIn = false;
      this.username = '';
    }
  }

  findAllPost(): void {
    this.postCollection = [];
    this.postService.getAllPost().subscribe((value: Post[]) => {
      this.postCollection = value;
      console.log(value);
    });

    this.clearSearch();
  }

  clearSearch() {
    this.search.searchKey = '';
  }

  findByAuthor() {
    this.postService.search(this.search).subscribe((data) => {
      this.postCollection = data;
      console.log(data);
    });
  }

  gotoDetail(post: any): void {
    this.post = post;
    this.router.navigateByUrl('/post-details/' + post.id);
  }

  calculateDiff(date: any) {
    let start = new Date().getTime();
    let end = new Date(date.createdDate).getTime();
    let time = start - end;
    let diffDay = Math.floor(time / 86400000);
    let diffHours = Math.floor((time % 86400000) / 3600000);
    let diffMinutes = Math.floor((time % 86400000) % 3600000) / 60000;

    if (diffDay >= 1) {
      return diffDay;
    } else {
      return diffHours;
    }
  }

  hourTime(key: any) {
    let start = new Date().getTime();
    let end = new Date(key.createdDate).getTime();
    let time = start - end;
    let diffDay = Math.floor(time / 86400000);
    let diffHours = Math.floor(time % 86400000);
    let diffMinutes = Math.floor((time % 86400000) % 3600000) / 60000;

    if (diffDay >= 1) {
      return (key = 'Days Ago');
    } else {
      return (key = 'Hours Ago');
    }
  }
}
