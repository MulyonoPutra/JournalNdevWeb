import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Search } from '../../domain/dto/search';
import { Post } from '../../domain/entities/post';
import { PostRepository } from '../../repository/post.repository';
import { TokenService } from '../token.service';

@Injectable()
export class PostServiceImpl extends PostRepository {
  public post: Post;

  info: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };

  constructor(private http: HttpClient, private token: TokenService) {
    super();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUserName(),
      authorities: this.token.getAuthorities(),
    };
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

  getPostById(id: number): Observable<any> {
    return this.getAllPost().pipe(
      mergeMap((result) => result),
      first((post) => post.id === id)
    );
  }

  getPostByCategoryId(categoryId: any): Observable<any> {
    // return this.http.get(
    //   environment.baseEndpoint + 'api/post/search/category/' + categoryId
    // );
    return this.getAllPost().pipe(mergeMap((result) => result), first((post) => post.category_post?.id == categoryId));
  }

  search(search: Search): Observable<any> {
    return this.http
      .post(
        environment.baseEndpoint + 'api/post/search/author',
        search,
        this.httpOptions
      )
      .pipe(map((response: any) => response));
  }
}
