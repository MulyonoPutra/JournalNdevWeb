/* Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* Components */
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { CardsComponent } from './pages/components/cards/cards.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { ProductNewComponent } from './pages/product/product-new/product-new.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { FoldingCardComponent } from './pages/folding-card/folding-card.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';

/* Others */
import { PostComponent } from './pages/post/list/post.component';
import { PostRepository } from '../core/repository/post.repository';
import { PostServiceImpl } from '../core/service/service-impl/post.service-impl';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategoryRepository } from '../core/repository/category.repository';
import { CategoryServiceImpl } from '../core/service/service-impl/category.service-impl';
import { ProdGuardService as guard } from '../core/guards/prod-guard.service';
import { PostDetailsComponent } from './pages/post/details/post-details.component';
import { PostUpdateComponent } from './pages/post/update/post-update.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'card', component: FoldingCardComponent },
      {
        path: 'post',
        component: PostComponent,
      },
      { path: 'new', component: PostUpdateComponent },
      { path: 'details', component: PostDetailsComponent },
      {
        path: 'list',
        component: ProductListComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      /* {
        path: 'new',
        component: ProductNewComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      }, */
      {
        path: 'edit/:id',
        component: ProductEditComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    PresentationComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductNewComponent,
    ProductEditComponent,
    CategoryComponent,
    NavbarComponent,
    FooterComponent,
    FoldingCardComponent,
    CardsComponent,
    PageNotFoundComponent,
    PostComponent,
    PostDetailsComponent,
    PostUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: CategoryRepository, useClass: CategoryServiceImpl },
    { provide: PostRepository, useClass: PostServiceImpl },
    { provide: CategoryServiceImpl },
  ],
})
export class PresentationModule {}
