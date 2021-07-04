import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './core/interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './presentation/pages/authentication/login/login.component';
import { IndexComponent } from './presentation/pages/index/index.component';
import { MenuComponent } from './presentation/pages/menu/menu.component';
import { ProductNewComponent } from './presentation/pages/product/product-new/product-new.component';
import { ProductListComponent } from './presentation/pages/product/product-list/product-list.component';
import { ProductEditComponent } from './presentation/pages/product/product-edit/product-edit.component';
import { ProductDetailsComponent } from './presentation/pages/product/product-details/product-details.component';
import { RegisterComponent } from './presentation/pages/authentication/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
