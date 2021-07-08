import { Observable } from 'rxjs';

import { Post } from '../domain/entities/post';
import { Search } from '../domain/dto/search';

export abstract class PostRepository {

  abstract getAllPost(): Observable<Post[]>;

  abstract addPost(post: Post): Observable<any>;

  abstract updatePost(post: Post): Observable<any>;

  abstract search(search: Search): Observable<any>;

}
