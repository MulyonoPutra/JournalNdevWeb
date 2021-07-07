import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(private spinner: NgxSpinnerService) {}

  /* Function to set spinner when navigate to other page */
  setSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

}
