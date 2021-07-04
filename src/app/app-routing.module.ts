import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { IndexComponent } from './index/index.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  {
    path: 'new',
    component: ProductNewComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
