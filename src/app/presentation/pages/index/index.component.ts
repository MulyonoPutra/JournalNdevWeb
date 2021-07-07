import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/domain/entities/category';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { TokenService } from '../../../core/service/token.service';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  isLogged = false;

  username = '';

  categories: Array<Category>;

  constructor(
    private tokenService: TokenService,
    private categoryService: CategoryRepository,
    private utils: UtilityService
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
