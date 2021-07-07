
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { ProductNewComponent } from './pages/product/product-new/product-new.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';

import { ProdGuardService as guard } from '../core/guards/prod-guard.service';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryRepository } from '../core/repository/category.repository';
import { CategoryServiceImpl } from '../core/service/service-impl/category.service-impl';
import { PresentationComponent } from './presentation.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { FooterComponent } from './pages/components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent,
    children: [
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
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
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
    CategoryComponent, NavbarComponent, FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,NgxSpinnerModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: CategoryRepository, useClass: CategoryServiceImpl }],
})
export class PresentationModule {}
