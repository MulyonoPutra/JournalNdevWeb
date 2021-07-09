import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';
import { Post } from 'src/app/core/domain/entities/post';
import { PostRepository } from 'src/app/core/repository/post.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  
  isLogged = false;

  username = '';

  posts: Array<Post>;

  public postObject: Post;

  constructor(
    private tokenService: TokenService,
    private postService: PostRepository,
    private utils: UtilityService,
    private router: Router
  ) {}

  ngOnInit() {
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

  findAllPost() {
    this.posts = [];
    this.postService.getAllPost().subscribe((value: Post[]) => {
      this.posts = value;
      console.log(value);
    });
  }

  gotoDetail(post: any) {
    this.postObject = post;
    this.router.navigateByUrl('/post-details/' + post.id);
  }
}
