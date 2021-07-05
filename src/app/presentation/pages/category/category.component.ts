import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/domain/entities/category';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  
  isLogged = false;

  username = '';

  categories: Array<Category>;

  constructor(
    private tokenService: TokenService,
    private categoryService: CategoryRepository
  ) {}

  ngOnInit() {
    this.getUserToken();
    this.findAllCategory();
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

  findAllCategory() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe((value: Category[]) => {
      this.categories = value;
    });
  }
}
