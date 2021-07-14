import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cards } from 'src/app/core/domain/entities/cards';
import { CardCollection } from 'src/app/core/domain/static/folding-card';
import { CardsRepository } from 'src/app/core/repository/cards.repository';
import { TokenService } from 'src/app/core/service/token.service';
import { UtilityService } from 'src/app/core/service/utils/utility.service';

@Component({
  selector: 'app-folding-card',
  templateUrl: './folding-card.component.html',
  styleUrls: ['./folding-card.component.scss'],
})
export class FoldingCardComponent implements OnInit, OnDestroy {
  
  isLoggedIn = false;

  username = '';

  cards: Cards[] = [];

  constructor(
    private tokenService: TokenService,
    private utils: UtilityService,
    private cardsService: CardsRepository
  ) {}

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.getUserToken();
    this.findAllCards();
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

  findAllCards() {
    this.cards = [];
    this.cardsService.getAllCards().subscribe((value: Cards[]) => {
      this.cards = value;
    });
  }
}
