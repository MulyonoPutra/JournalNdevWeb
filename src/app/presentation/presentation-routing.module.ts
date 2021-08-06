import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './pages/post/list/post.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { CategoryComponent } from './pages/category/list/category.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { PostUpdateComponent } from './pages/post/update/post-update.component';
import { PostDetailsComponent } from './pages/post/details/post-details.component';
import { FoldingCardComponent } from './pages/folding-card/list/folding-card.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation.component';
import { CategoryUpdateComponent } from './pages/category/update/category-update.component';
import { CategoryDetailsComponent } from './pages/category/details/category-details.component';
import { FoldingCardUpdateComponent } from './pages/folding-card/update/folding-card-update.component';

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

      {
        path: 'card',
        component: FoldingCardComponent,
      },
      { path: 'card-new', component: FoldingCardUpdateComponent },

      { path: 'post', component: PostComponent },
      { path: 'new', component: PostUpdateComponent },
      { path: 'post-details/:id', component: PostDetailsComponent },

      { path: 'feedback', component: FeedbackComponent },
      // {
      //   path: 'list',
      //   component: ProductListComponent,
      //   canActivate: [guard],
      //   data: { expectedRole: ['admin', 'user'] },
      // },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
