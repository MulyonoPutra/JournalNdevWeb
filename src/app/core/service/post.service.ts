import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Category } from '../domain/entities/category';
import { Post } from '../domain/entities/post';
import { PostRepository } from '../repository/post.repository';

export type EntityArrayResponseType = HttpResponse<Category[]>;
@Injectable()
export class PostService extends PostRepository {
  constructor(private postRepository: PostRepository) {
    super();
  }
  getAllPost(): Observable<Post[]> {
    return this.postRepository.getAllPost();
  }
  addPost(post: Post): Observable<any> {
    return this.postRepository.addPost(post);
  }

  getPostById(id: number): Observable<any> {
    return this.postRepository.getPostById(id);
  }

  updatePost(post: Post): Observable<any> {
    return this.postRepository.updatePost(post);
  }

  search(search: Search): Observable<any> {
    return this.postRepository.search(search);
  }
}
