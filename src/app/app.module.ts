import { AppComponent } from './app.component';
import { interceptorProvider } from './core/interceptors/prod-interceptor.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* external */
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './core/utility/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
  ],

  bootstrap: [AppComponent],
  providers: [interceptorProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
