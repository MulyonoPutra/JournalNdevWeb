import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/dto/search';
import { Post } from '../domain/entities/post';
import { PostRepository } from '../repository/post.repository';

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
  search(search: Search): Observable<any> {
    return this.postRepository.search(search);
  }

}
