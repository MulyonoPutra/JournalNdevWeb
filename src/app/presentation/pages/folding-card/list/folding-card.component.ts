import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cards } from 'src/app/core/domain/entities/cards';
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

  isAdmin = false;
  isUser = false;

  roles!: string[];

  constructor(
    private tokenService: TokenService,
    private utils: UtilityService,
    private cardsService: CardsRepository
  ) {}

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.utils.setSpinner();
    this.getUserToken();
    this.findAllCards();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
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
