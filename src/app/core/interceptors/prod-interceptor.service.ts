import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProdInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Internal Server Error!',
        });
        return throwError(errorMessage);
      });
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true },
];
