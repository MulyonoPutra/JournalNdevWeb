import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Category } from '../domain/entities/category';

export abstract class CategoryRepository {

  abstract getAllCategory(): Observable<Category[]>;

  abstract addCategory(categories: Category): Observable<any>;

  abstract search(search: Search): Observable<any>;
  
}
