import { Category } from './category';

export interface Post {
  title: string;
  content: string;
  imagesContentType?: string;
  images?: string;
  category_post?: Category | null;
}

export interface PostEntity {
  id: number;
  title: string;
  content: string;
  imagesContentType?: string;
  images?: string;
  category_post?: Category | null;
}
