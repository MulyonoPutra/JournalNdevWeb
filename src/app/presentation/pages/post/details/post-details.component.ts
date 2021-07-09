import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/domain/entities/post';
import { Location } from '@angular/common';
import { PostRepository } from 'src/app/core/repository/post.repository';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {

  public post: Post;

  public postData: Post[] = [];

  constructor(
    private postService: PostRepository,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.postService.getPostById(id).subscribe((data: Post) => {
      this.post = data;
      console.log(data);
      console.log('Cerpen Details Works!');
    });
  }

  goBack(): void {
    this.location.back();
  }
}
