import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Post } from '../domain/entities/post';

export abstract class PostRepository {

  abstract getAllPost(): Observable<Post[]>;

  abstract addPost(categories: Post): Observable<any>;

  abstract search(search: Search): Observable<any>;
  
}
