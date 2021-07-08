import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { Search } from '../../domain/dto/search';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../../utility/request-utils';
import { Category, getCategoryIdentifier } from '../../domain/entities/category';
import { isPresent } from '../../utility/operators';
import { CategoryRepository } from '../../repository/category.repository';

export type EntityArrayResponseType = HttpResponse<Category[]>;
@Injectable()
export class CategoryServiceImpl extends CategoryRepository {

  public category: Category;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<any>(environment.baseEndpoint + 'api/category');
  }

  addCategory(categories: Category): Observable<any> {
    return this.http.post(
      environment.baseEndpoint + '/v1/category',
      categories
    );
  }

  search(search: Search): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<Category[]>(
      environment.baseEndpoint + 'api/category',
      {
        params: options,
        observe: 'response',
      }
    );
  }

  addCategoryToCollectionIfMissing(categoryCollection: Category[],...categoriesToCheck: (Category | null | undefined)[]): Category[] {

    const categories: Category[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categoryCollectionIdentifiers = categoryCollection.map(
        (categoryItem) => getCategoryIdentifier(categoryItem)!
      );
      const categoriesToAdd = categories.filter((categoryItem) => {
        const categoryIdentifier = getCategoryIdentifier(categoryItem);
        if (
          categoryIdentifier == null ||
          categoryCollectionIdentifiers.includes(categoryIdentifier)
        ) {
          return false;
        }
        categoryCollectionIdentifiers.push(categoryIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categoryCollection];
    }
    return categoryCollection;
  }
}
