import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AlertError } from 'src/app/core/domain/dto/alert-error';

import { Category } from 'src/app/core/domain/entities/category';
import { Post, IPost } from 'src/app/core/domain/entities/post';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { PostRepository } from 'src/app/core/repository/post.repository';
import {
  DataUtils,
  FileLoadError,
} from 'src/app/core/service/data-utils.service';
import {
  EventManager,
  EventWithContent,
} from 'src/app/core/service/even-manager.service';
import { CategoryServiceImpl } from 'src/app/core/service/service-impl/category.service-impl';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent implements OnInit, OnDestroy {

  public isLogged = false;

  public isSaving = false;

  public categoriesSharedCollection: Category[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    images: [null, [Validators.required]],
    imagesContentType: [],
    category_post: [],
  });

  constructor(
    protected postService: PostRepository,
    protected categoryService: CategoryRepository,
    protected tokenService: TokenService,
    protected categoryServiceImpl: CategoryServiceImpl,
    protected fb: FormBuilder,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadRelationshipsOptions();
    this.activatedRoute.data.subscribe(({ post }) => {
      this.updateForm(post);

      this.loadRelationshipsOptions();
    });
  }

  ngOnDestroy() {
    window.location.reload();
  }

  getUserToken() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils
      .loadFileToForm(event, this.editForm, field, isImage)
      .subscribe({
        error: (err: FileLoadError) =>
          this.eventManager.broadcast(
            new EventWithContent<AlertError>('KataNdevApp.error', {
              message: err.message,
            })
          ),
      });
  }

  clearInputImage(
    field: string,
    fieldContentType: string,
    idInput: string
  ): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const post = this.createFromForm();
    this.subscribeToSaveResponse(this.postService.addPost(post));
    // if (post.id !== undefined) {
    //   this.subscribeToSaveResponse(this.postService.updatePost(post));
    // } else {
    //   this.subscribeToSaveResponse(this.postService.addPost(post));
    // }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Post>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  trackCategoryById(index: number, item: Category): number {
    return item.id!;
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(post: Post): void {
    this.editForm.patchValue({
      id: post.id,
      title: post.title,
      content: post.content,
      images: post.images,
      imagesContentType: post.imagesContentType,
      category_post: post.category_post,
    });

    this.categoriesSharedCollection =
      this.categoryServiceImpl.addCategoryToCollectionIfMissing(
        this.categoriesSharedCollection,
        post.category_post
      );
  }

  protected createFromForm(): Post {
    return {
      ...new IPost(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      imagesContentType: this.editForm.get(['imagesContentType'])!.value,
      images: this.editForm.get(['images'])!.value,
      category_post: this.editForm.get(['category_post'])!.value,
    };
  }

  protected loadRelationshipsOptions(): void {
    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<Category[]>) => res.body ?? []))
      .pipe(
        map((categories: Category[]) =>
          this.categoryServiceImpl.addCategoryToCollectionIfMissing(
            categories,
            this.editForm.get('category_post')!.value
          )
        )
      )
      .subscribe(
        (categories: Category[]) =>
          (this.categoriesSharedCollection = categories)
      );
  }
}
