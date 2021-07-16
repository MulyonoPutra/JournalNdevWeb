import { Category } from 'src/app/core/domain/entities/category';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';
import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { Post } from 'src/app/core/domain/entities/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  public isLoggedIn = false;

  public username = '';

  public currentCategoryId: number = 1;

  public categories: Category[] = [];

  public postObject: Post;

  constructor(
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private utils: UtilityService,
    private categoryService: CategoryRepository,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserToken();
    this.findAllCategory();
    this.utils.setSpinner();

    this.activatedRoute.paramMap.subscribe(() => {
      this.handlePostByCategory();
    });
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

  postDetailsRoute(post: any): void {
    this.postObject = post;
    this.router.navigateByUrl('/category-details/' + post.id);
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

  findAllCategory() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe((value: Category[]) => {
      this.categories = value;
    });
  }
}
