import { Category } from './category';

export interface Post {
  id?: number;
  title?: string;
  content?: string;
  imagesContentType?: string;
  images?: string;
  category_post?: Category | null;
}

export class IPost implements Post {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public imagesContentType?: string,
    public images?: string,
    public category_post?: Category | null
  ) {}
}

export interface PostEntity {
  id: number;
  title: string;
  content: string;
  imagesContentType?: string;
  images?: string;
  category_post?: Category | null;
}
