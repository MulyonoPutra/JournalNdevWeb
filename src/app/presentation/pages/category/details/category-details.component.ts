import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/domain/entities/post';
import { PostRepository } from 'src/app/core/repository/post.repository';
import { UtilityService } from 'src/app/core/service/utils/utility.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {

  public post: Post;
  
  public postCollection: Post[] = [];

  public currentCategoryId: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostRepository,
    private utils: UtilityService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utils.setSpinner();
    this.activatedRoute.paramMap.subscribe(() => {
      this.utils.setSpinner();
      this.getPostByCategoryId();
    });
  }

  getPostByCategoryId(): void {
    const hasCategoryId: boolean =
      this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId =
        +this.activatedRoute.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.postService
      .getPostByCategoryId(this.currentCategoryId)
      .subscribe((data) => {
        this.postCollection = data;
      });
  }

  postDetailsRoute(post: any): void {
    this.post = post;
    this.router.navigateByUrl('/post-details/' + post.id);
  }

  calculateDiff(date: any) {
    let start = new Date().getTime();
    let end = new Date(date.createdDate).getTime();
    let time = start - end;
    let diffDay = Math.floor(time / 86400000);
    let diffHours = Math.floor((time % 86400000) / 3600000);
    let diffMinutes = Math.floor((time % 86400000) % 3600000) / 60000;

    if (diffDay >= 1) {
      return diffDay;
    } else {
      return diffHours;
    }
  }


  hourTime(key: any) {
    let start = new Date().getTime();
    let end = new Date(key.createdDate).getTime();
    let time = start - end;
    let diffDay = Math.floor(time / 86400000);
    let diffHours = Math.floor(time % 86400000);
    let diffMinutes = Math.floor((time % 86400000) % 3600000) / 60000;

    if (diffDay >= 1) {
      return (key = 'Days Ago');
    } else {
      return (key = 'Hours Ago');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
