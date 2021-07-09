import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardCollection } from 'src/app/core/domain/static/folding-card';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'app-folding-card',
  templateUrl: './folding-card.component.html',
  styleUrls: ['./folding-card.component.scss'],
})
export class FoldingCardComponent implements OnInit, OnDestroy {
  
  @Input() content: any;

  public cards = CardCollection;

  public isLogged = false;

  public username = '';

  constructor(private utils: UtilityService) {}

  ngOnInit(): void {
    this.utils.setSpinner();
    this.utils.checkUserToken();
  }

  ngOnDestroy(): void {
    window.location.reload();
  }
}
