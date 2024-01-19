import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`
      });

      request = request.clone({
        headers: request.headers.set('authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request);
  }
}
