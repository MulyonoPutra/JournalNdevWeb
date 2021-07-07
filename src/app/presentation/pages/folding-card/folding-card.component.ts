import { Component, Input, OnInit } from '@angular/core';
import { CARDS } from 'src/app/core/domain/static/folding-card';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'app-folding-card',
  templateUrl: './folding-card.component.html',
  styleUrls: ['./folding-card.component.scss'],
})
export class FoldingCardComponent implements OnInit {
  @Input() content: any;

  @Input() isReadMore: boolean = false;

  public isCollapsed: boolean = true;

  post = CARDS;

  isLogged = false;

  username = '';

  constructor(tokenService: TokenService, private utils: UtilityService) {}

  ngOnInit(): void {
    this.utils.setSpinner();
  }
}
