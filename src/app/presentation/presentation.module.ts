/* Module */
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/utility/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PresentationRoutingModule } from './presentation-routing.module';

/* Components */
import { PostComponent } from './pages/post/list/post.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { NoDataComponent } from './pages/no-data/no-data.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CategoryComponent } from './pages/category/list/category.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { PostUpdateComponent } from './pages/post/update/post-update.component';
import { FoldingCardComponent } from './pages/folding-card/list/folding-card.component';
import { PostDetailsComponent } from './pages/post/details/post-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation.component';
import { CategoryUpdateComponent } from './pages/category/update/category-update.component';
import { CategoryDetailsComponent } from './pages/category/details/category-details.component';
import { FoldingCardUpdateComponent } from './pages/folding-card/update/folding-card-update.component';
import { FoldingCardDetailsComponent } from './pages/folding-card/details/folding-card-details.component';

/* Service */
import { PostRepository } from '../core/repository/post.repository';
import { CardsRepository } from '../core/repository/cards.repository';
import { FeedbackRepository } from '../core/repository/feedback.repository';
import { CategoryRepository } from '../core/repository/category.repository';

import { PostServiceImpl } from '../core/service/impl/post.service-impl';
import { CardsServiceImpl } from '../core/service/impl/cards.service-impl';
import { FeedbackServiceImpl } from '../core/service/impl/feedback.service-impl';
import { CategoryServiceImpl } from '../core/service/impl/category.service-impl';

/* Others */
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    PostComponent,
    IndexComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    NoDataComponent,
    FeedbackComponent,
    CategoryComponent,
    RegisterComponent,
    PostUpdateComponent,
    FoldingCardComponent,
    PostDetailsComponent,
    PresentationComponent,
    PageNotFoundComponent,
    CategoryUpdateComponent,
    CategoryDetailsComponent,
    FoldingCardDetailsComponent,
    FoldingCardUpdateComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    EditorModule,
    RouterModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    PresentationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: CategoryServiceImpl },
    { provide: PostRepository, useClass: PostServiceImpl },
    { provide: CardsRepository, useClass: CardsServiceImpl },
    { provide: CategoryRepository, useClass: CategoryServiceImpl },
    { provide: FeedbackRepository, useClass: FeedbackServiceImpl },
  ],
})
export class PresentationModule {}
