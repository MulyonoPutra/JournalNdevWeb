import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/domain/entities/category';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { TokenService } from '../../../core/service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  isLogged = false;

  username = '';

  constructor(
    private tokenService: TokenService,
  ) {}

  ngOnInit() {
    this.getUserToken();
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


}