import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Search } from '../domain/dto/search';
import { Category } from '../domain/entities/category';

export type EntityArrayResponseType = HttpResponse<Category[]>;
export abstract class CategoryRepository {

  abstract getAllCategory(): Observable<Category[]>;

  abstract addCategory(categories: Category): Observable<any>;

  abstract search(search: Search): Observable<any>;

  abstract query(): Observable<EntityArrayResponseType>;

}
