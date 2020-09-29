import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// ========================
// Interceptor
// ========================

// HttpInterceptor - класс, который позволяет перехватывать HTTP-запросы перед их отправкой и вносить в них изменения.

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  // intercept() модифицирует исходный запрос и возвращает объект Observable события HttpEvent<any>, который в свою очередь возвращает метод next() объекта типа HttpRequest

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Оригинальный запрос req, который получен, до модификации
    console.log(req);

    // Оригинальный запрос req, который получен, нельзя изменять.
    // Сперва его нужно клонировать с помощью метода clone().
    // clone() получает параметром объект, с помощью которого мы можем обновить наш запрос.
    // Например добавим новые хедеры - для этого в свойстве headers обратимся к существующим хедерам req.headers и с помощью метода append() добавим новые хедеры:
    const cloned = req.clone({
      headers: req.headers.append('Auth', 'Random token 777'),
    });

    // Теперь все запросы нашего приложения будет иметь хедер Auth:
    // браузер -> Network -> Request Headers

    // В качестве аргумента next() принимает модифицированный объект запроса
    // return next.handle(cloned);

    // Конструкция next.handle(cloned) является стримом, а значит мы можем с помощью rxjs-метода pipe() обрабатывать результаты запроса (детальнее про стримы см. app.component):
    return next.handle(cloned).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log('INTERCEPTOR RESPONSE ==>', event);
        }
      })
    );
  }
}
