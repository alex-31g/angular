import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  // Все методы сервиса HttpClient возвращают объект Observable, который является частью библиотеки rxjs.
  // Наблюдатель (Observable) представляет своего рода поток, и для прослушивания событий из этого потока применяется метод подписки subscribe(), которому можно передавать две функции-обработчика:
  // - первая выполнится в случае успешного ответа от сервера
  // - вторая - в случае ошибки, которую мы можем обработать

  // Для выполнения GET-запроса у объекта HttpClient вызывается метод get(), в который передается адрес запроса
  sendGetRequest_1() {
    // 1 вариан: подписка - вызов метода subscribe() - непосредственно в сервисе
    // this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    // 2 вариан: подписка - вызов метода subscribe() - будет произведена в месте вызова ф-ции sendGetRequest_1()
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  // GET-запроса с параметрами (вариант 1)
  sendGetRequest_2(param) {
    return this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts/' + param
    );
  }

  // GET-запроса с параметрами (вариант 2)
  sendGetRequest_3(param) {
    const params = new HttpParams().set('param', param.toString());
    // const params = new HttpParams({ fromString: param.toString() });
    // const params = new HttpParams({ fromObject: { query: param.toString() } });
    const options = { params: params };
    console.log(777, options.toString());

    return this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts/',
      options
    );
  }
}
