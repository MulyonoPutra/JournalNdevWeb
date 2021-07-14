import { Category, ICategory } from 'src/app/core/domain/entities/category';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryRepository } from 'src/app/core/repository/category.repository';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataUtils } from 'src/app/core/service/utils/data-utils.service';
import { EventManager } from 'src/app/core/service/utils/even-manager.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent implements OnInit {

  public isLoggedIn = false;

  public isSaving = false;

  public categoriesSharedCollection: Category[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(
    protected categoryService: CategoryRepository,
    protected tokenService: TokenService,
    protected fb: FormBuilder,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.location.reload();
  }

  getUserToken(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    this.subscribeToSaveResponse(this.categoryService.addCategory(category));
    // if (cards.id !== undefined) {
    //   this.subscribeToSaveResponse(this.cardsService.updateCards(cards));
    // } else {
    //   this.subscribeToSaveResponse(this.cardsService.addCards(cards));
    // }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Category>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
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

  protected updateForm(cards: Category): void {
    this.editForm.patchValue({
      id: cards.id,
      title: cards.name,
    });
  }

  protected createFromForm(): Category {
    return {
      ...new ICategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
