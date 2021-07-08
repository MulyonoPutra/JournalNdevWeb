import { Category } from 'src/app/core/domain/entities/category';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utility.service';
import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from 'src/app/core/repository/category.repository';

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
    private utils: UtilityService,
    private categoryService: CategoryRepository
  ) {}

  ngOnInit() {
    this.getUserToken();
    this.findAllCategory();
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

  findAllCategory() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe((value: Category[]) => {
      this.categories = value;
    });
  }
}
