import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Search } from '../../domain/dto/search';
import { Post } from '../../domain/entities/post';
import { PostRepository } from '../../repository/post.repository';

@Injectable()
export class PostServiceImpl extends PostRepository {

  public post: Post;

  constructor(private http: HttpClient) {
    super();
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<any>(environment.baseEndpoint + 'api/post');
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(environment.baseEndpoint + 'api/post', post);
  }

  updatePost(post: Post): Observable<any> {
    throw new Error('Method not implemented.');
  }

  search(search: Search): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
