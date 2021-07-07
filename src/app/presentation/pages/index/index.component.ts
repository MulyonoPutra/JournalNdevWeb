import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/domain/entities/category';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { TokenService } from '../../../core/service/token.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  isLogged = false;

  username = '';

  categories: Array<Category>;

  private updateSubscription: Subscription;

  private unsubscribe: Subject<any> = new Subject();

  sub: any;

  constructor(
    private tokenService: TokenService,
    private categoryService: CategoryRepository,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refresh();
    //this.clearTimeout();
    this.setSpinner();
    this.getUserToken();
    this.findAllCategory();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  setSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  }

  refresh(): void {
    
//location.reload(true);
  }

/*   clearTimeout() {
    setTimeout(() => {
      window.clearTimeout(this.interval);
    }, 3000);
  } */

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
