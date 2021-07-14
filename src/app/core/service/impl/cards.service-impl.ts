import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Search } from '../../domain/dto/search';
import { Cards } from '../../domain/entities/cards';
import { CardsRepository } from '../../repository/cards.repository';

@Injectable()
export class CardsServiceImpl extends CardsRepository {

  public post: Cards;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCards(): Observable<Cards[]> {
    return this.http.get<any>(environment.baseEndpoint + 'api/card');
  }

  addCards(card: Cards): Observable<any> {
    return this.http.post(environment.baseEndpoint + 'api/card', card);
  }

}
