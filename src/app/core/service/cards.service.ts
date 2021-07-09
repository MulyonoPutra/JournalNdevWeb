import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Cards } from '../domain/entities/cards';
import { CardsRepository } from '../repository/cards.repository';

export type EntityArrayResponseType = HttpResponse<Cards[]>;

@Injectable()
export class CardsService extends CardsRepository {

  constructor(private cardsRepository: CardsRepository) {
    super();
  }

  getAllCards(): Observable<Cards[]> {
    return this.cardsRepository.getAllCards();
  }
  addCards(cards: Cards): Observable<any> {
    return this.cardsRepository.addCards(cards);
  }

  search(search: Search): Observable<any> {
    return this.cardsRepository.search(search);
  }

  query(): Observable<EntityArrayResponseType> {
    throw new Error('Method not implemented.');
  }
}
