import { Observable } from 'rxjs';
import { Cards } from '../domain/entities/cards';

export abstract class CardsRepository {
  abstract getAllCards(): Observable<Cards[]>;

  abstract addCards(categories: Cards): Observable<any>;
}
