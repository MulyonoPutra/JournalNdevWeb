export interface Category {
  id?: number;
  name?: string;
}
export class ICategory implements Category {
  constructor(public id?: number, public name?: string) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
