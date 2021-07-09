import { Category } from './category';

export interface Post {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  imagesContentType?: string;
  images?: string;
  category_post?: Category | null;
  createdDate?: string;
}

export class IPost implements Post {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public author?: string,
    public imagesContentType?: string,
    public images?: string,
    public category_post?: Category | null,
    public createdDate?: string
  ) {}
}
