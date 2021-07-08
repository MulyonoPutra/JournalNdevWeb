import { Mapper } from '../base/mapper';
import { PostEntity, Post } from '../domain/entities/post';

export class PostRepositoryMapper extends Mapper<PostEntity, Post> {
  mapFrom(param: PostEntity): Post {
    return {
      title: param.title,
      content: param.content,
      imagesContentType: param.imagesContentType,
      images: param.images,
      category_post: param.category_post,
    };
  }

  mapTo(param: Post): PostEntity {
    return {
      id: 0,
      title: param.title,
      content: param.content,
      imagesContentType: param.imagesContentType,
      images: param.images,
      category_post: param.category_post,
    };
  }
}
