import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Search } from '../../domain/dto/search';
import { Category } from '../../domain/entities/category';
import { CategoryRepositoryMapper } from '../../mapper/category.mapper';
import { CategoryRepository } from '../../repository/category.repository';

@Injectable()
export class CategoryServiceImpl extends CategoryRepository {

  mapper = new CategoryRepositoryMapper();

  public category: Category;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http
      .get<any>(environment.baseEndpoint + 'api/category');
  }

  addCategory(categories: Category): Observable<any> {
    return this.http.post(environment.baseEndpoint + '/v1/post', categories);
  }

  search(search: Search): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
