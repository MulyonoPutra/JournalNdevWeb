import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container mt-5">
      <div class="d-flex justify-content-center">
        <img src="/assets/images/svg/404.svg" alt="" />
      </div>
    </div>
  `,
})
export class PageNotFoundComponent implements OnInit {

  constructor(private utils: UtilityService) {}

  ngOnInit(): void {
    this.utils.setSpinner();
  }
  
}
