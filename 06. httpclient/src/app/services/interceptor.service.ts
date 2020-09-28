import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// ========================
// Interceptor
// ========================

// HttpInterceptor - класс, который позволяет перехватывать HTTP-запросы перед их отправкой и вносить в них изменения.

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);

    return next.handle(req);
  }
}
