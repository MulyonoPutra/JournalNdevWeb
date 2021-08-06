import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/domain/entities/post';
import { Search } from 'src/app/core/domain/dto/search';
import { Category } from 'src/app/core/domain/entities/category';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { PostRepository } from 'src/app/core/repository/post.repository';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post: Post;

  public isLoggedIn = false;

  public username = '';

  public currentCategoryId: number = 1;

  public postCollection: Post[] = [];

  public categories: Category[] = [];

  public search: Search = new Search();

  constructor(
    private router: Router,
    private utils: UtilityService,
    private tokenService: TokenService,
    private postService: PostRepository,
    private categoryService: CategoryRepository,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserToken();
    this.utils.setSpinner();
    this.findAllPost();
    this.findAllCategory();
    this.activatedRoute.paramMap.subscribe(() => {
      this.handlePostByCategory();
    });
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

  handlePostByCategory() {
    const hasCategoryId: boolean =
      this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId =
        +this.activatedRoute.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
  }

  findAllCategory() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe((value: Category[]) => {
      this.categories = value;
      console.log(value);
    });
  }

  findAllPost(): void {
    this.postCollection = [];
    this.postService.getAllPost().subscribe((value: Post[]) => {
      this.postCollection = value;
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

  postDetailsRoute(post: any): void {
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
