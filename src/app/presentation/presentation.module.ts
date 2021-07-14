/* Module */
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/utility/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Components */
import { PostComponent } from './pages/post/list/post.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CategoryComponent } from './pages/category/list/category.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { PostUpdateComponent } from './pages/post/update/post-update.component';
import { ProductNewComponent } from './pages/product/product-new/product-new.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { FoldingCardComponent } from './pages/folding-card/list/folding-card.component';
import { PostDetailsComponent } from './pages/post/details/post-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation.component';
import { CategoryUpdateComponent } from './pages/category/update/category-update.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { CategoryDetailsComponent } from './pages/category/details/category-details.component';
import { FoldingCardUpdateComponent } from './pages/folding-card/update/folding-card-update.component';
import { FoldingCardDetailsComponent } from './pages/folding-card/details/folding-card-details.component';

/* Others */
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PostRepository } from '../core/repository/post.repository';
import { CardsRepository } from '../core/repository/cards.repository';
import { FeedbackRepository } from '../core/repository/feedback.repository';
import { CategoryRepository } from '../core/repository/category.repository';
import { PostServiceImpl } from '../core/service/impl/post.service-impl';
import { FeedbackServiceImpl } from '../core/service/impl/feedback.service-impl';
import { CardsServiceImpl } from '../core/service/impl/cards.service-impl';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryServiceImpl } from '../core/service/impl/category.service-impl';
import { HttpErrorInterceptor } from '../core/interceptors/http-error.interceptor';
import { ProdGuardService as guard } from '../core/guards/prod-guard.service';
import { NoDataComponent } from './pages/no-data/no-data.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'category-update', component: CategoryUpdateComponent },
      { path: 'category/:id', component: CategoryDetailsComponent },

      { path: 'card', component: FoldingCardComponent },
      { path: 'card-new', component: FoldingCardUpdateComponent },

      { path: 'post', component: PostComponent },
      { path: 'new', component: PostUpdateComponent },
      { path: 'post-details/:id', component: PostDetailsComponent },

      { path: 'feedback', component: FeedbackComponent },
      {
        path: 'list',
        component: ProductListComponent,
        canActivate: [guard],
        data: { expectedRole: ['admin', 'user'] },
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        canActivate: [guard],
        data: { expectedRole: ['admin', 'user'] },
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
        canActivate: [guard],
        data: { expectedRole: ['admin'] },
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

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
    ProductNewComponent,
    PostUpdateComponent,
    FoldingCardComponent,
    PostDetailsComponent,
    ProductEditComponent,
    ProductListComponent,
    PresentationComponent,
    PageNotFoundComponent,
    CategoryUpdateComponent,
    ProductDetailsComponent,
    CategoryDetailsComponent,
    FoldingCardDetailsComponent,
    FoldingCardUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EditorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: CategoryServiceImpl },
    { provide: PostRepository, useClass: PostServiceImpl },
    { provide: CardsRepository, useClass: CardsServiceImpl },
    { provide: CategoryRepository, useClass: CategoryServiceImpl },
    { provide: FeedbackRepository, useClass: FeedbackServiceImpl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class PresentationModule {}
