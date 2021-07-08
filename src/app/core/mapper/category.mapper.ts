/* import { Mapper } from '../base/mapper';
import { CategoryEntity, Category } from '../domain/entities/category';

export class CategoryRepositoryMapper extends Mapper<CategoryEntity, Category> {
  mapFrom(param: CategoryEntity): Category {
    return {
      id: param.id,
      name: param.name,
    };
  }

  mapTo(param: Category): CategoryEntity {
    return {
      id: 0,
      name: param.name,
    };
  }
}
 */
