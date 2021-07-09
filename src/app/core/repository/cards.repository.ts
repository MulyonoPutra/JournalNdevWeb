import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Search } from '../domain/dto/search';
import { Cards } from '../domain/entities/cards';

export type EntityArrayResponseType = HttpResponse<Cards[]>;

export abstract class CardsRepository {
  abstract getAllCards(): Observable<Cards[]>;

  abstract addCards(categories: Cards): Observable<any>;

  abstract search(search: Search): Observable<any>;

  abstract query(): Observable<EntityArrayResponseType>;

}
