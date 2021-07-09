import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertError } from 'src/app/core/domain/dto/alert-error';
import { Cards, ICards } from 'src/app/core/domain/entities/cards';
import { CardsRepository } from 'src/app/core/repository/cards.repository';
import {
  DataUtils,
  FileLoadError,
} from 'src/app/core/service/data-utils.service';
import {
  EventManager,
  EventWithContent,
} from 'src/app/core/service/even-manager.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-folding-card-update',
  templateUrl: './folding-card-update.component.html',
  styleUrls: ['./folding-card-update.component.scss'],
})
export class FoldingCardUpdateComponent implements OnInit, OnDestroy {
  
  public isLogged = false;

  public isSaving = false;

  public cardsSharedCollection: Cards[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    images: [null, [Validators.required]],
    imagesContentType: [],
  });

  constructor(
    protected cardsService: CardsRepository,
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
    const cards = this.createFromForm();
    this.subscribeToSaveResponse(this.cardsService.addCards(cards));
    // if (cards.id !== undefined) {
    //   this.subscribeToSaveResponse(this.cardsService.updateCards(cards));
    // } else {
    //   this.subscribeToSaveResponse(this.cardsService.addCards(cards));
    // }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Cards>>
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

  protected updateForm(cards: Cards): void {
    this.editForm.patchValue({
      id: cards.id,
      title: cards.title,
      images: cards.images,
      imagesContentType: cards.imagesContentType,
    });
  }

  protected createFromForm(): Cards {
    return {
      ...new ICards(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      imagesContentType: this.editForm.get(['imagesContentType'])!.value,
      images: this.editForm.get(['images'])!.value,
    };
  }
}
