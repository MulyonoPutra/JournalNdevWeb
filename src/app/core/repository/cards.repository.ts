import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Search } from '../domain/dto/search';
import { Cards } from '../domain/entities/cards';


export abstract class CardsRepository {

  abstract getAllCards(): Observable<Cards[]>;

  abstract addCards(categories: Cards): Observable<any>;

}
