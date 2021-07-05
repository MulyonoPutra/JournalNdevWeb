import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Category } from '../domain/entities/category';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryService extends CategoryRepository {

  addCategory(categories: Category): Observable<any> {
    return this.categoryRepository.addCategory(categories);
  }
  constructor(private categoryRepository: CategoryRepository) {
    super();
  }

  getAllCategory(): Observable<Category[]> {
    return this.categoryRepository.getAllCategory();
  }

  search(search: Search): Observable<any> {
    return this.categoryRepository.search(search);
  }
  
}
