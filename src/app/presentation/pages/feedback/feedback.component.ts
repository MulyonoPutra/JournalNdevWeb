import { HttpResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Feedback, IFeedback } from 'src/app/core/domain/entities/feedback';
import { FeedbackRepository } from 'src/app/core/repository/feedback.repository';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  public isLogged = false;

  public isSaving = false;

  editForm = this.fb.group({
    id: [],
    username: [null, [Validators.required]],
    email: [null, [Validators.required]],
    messages: [null, [Validators.required]],
  });

  constructor(
    protected tokenService: TokenService,
    protected feedbackService: FeedbackRepository,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  getUserToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  save(): void {
    this.isSaving = true;
    const feedback = this.createFromForm();
    this.subscribeToSaveResponse(this.feedbackService.addFeedback(feedback));
  }

  protected createFromForm(): Feedback {
    return {
      ...new IFeedback(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      email: this.editForm.get(['email'])!.value,
      messages: this.editForm.get(['messages'])!.value,
    };
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Feedback>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    Swal.fire('Thank you', 'For your feedback, we appreciate it!', 'success');
    setTimeout(() => {
      this.previousState();
    }, 7000);
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  previousState(): void {
    window.history.back();
  }
}
