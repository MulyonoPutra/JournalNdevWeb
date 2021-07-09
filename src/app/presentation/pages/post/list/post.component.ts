import { Component, OnInit } from '@angular/core';
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
  isLogged = false;

  username = '';

  postData: Array<Post>;

  constructor(
    private tokenService: TokenService,
    private utils: UtilityService,
    private postService: PostRepository
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
    this.postData = [];
    this.postService.getAllPost().subscribe((data: Post[]) => {
      this.postData = data;
    });
  }
}
