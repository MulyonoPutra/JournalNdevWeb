import { MenuComponent } from './pages/menu/menu.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { ProductNewComponent } from './pages/product/product-new/product-new.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { ProdGuardService as guard } from '../core/guards/prod-guard.service';
import { FormsModule } from '@angular/forms';

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
  declarations: [
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductNewComponent,
    ProductEditComponent,MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PresentationModule {}
