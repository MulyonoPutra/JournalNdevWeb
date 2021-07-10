import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  public isLogged = false;

  public username = '';

  public posts: Post[] = [];

  public postObject: Post;

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
      this.isLogged = true;
      this.username = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.username = '';
    }
  }

  findAllPost(): void {
    this.posts = [];
    this.postService.getAllPost().subscribe((value: Post[]) => {
      this.posts = value;
      console.log(value);
    });
  }

  gotoDetail(post: any): void {
    this.postObject = post;
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
