import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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

  // ============================

  // GET-запроса с параметрами (вариант 1)
  sendGetRequest_2(param) {
    return this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts/' + param
    );
  }

  // GET-запроса с параметрами (вариант 2) используя объект HttpParams
  // Если нужно получить строку запроса в которой присутствуют параметры вида '?param1=100&param2=200' -
  // можно использовать метод set или свойства fromString и fromObject объекта HttpParams, с помощью которых устанавливаются параметры, и затем этот объект передается в запрос
  sendGetRequest_3(par1) {
    const par2 = '200';

    // если ввели 3 - получим строку -
    // https://jsonplaceholder.typicode.com/posts/?param1=3&param2=200
    // const params = new HttpParams().set('param1', par1).set('param2', par2);

    // https://jsonplaceholder.typicode.com/posts/?query=7&query2=200
    // const params = new HttpParams({
    //   fromString: `query1=${par1}&query2=${par2}`,
    // });

    // https://jsonplaceholder.typicode.com/posts/?query=7&query2=200
    // const params = new HttpParams({
    //   fromObject: {
    //     query1: par1,
    //     query2: par2,
    //   },
    // });

    // НО САМЫЙ ПРОСТОЙ СПОСОБ - ЭТО ПРОСТО ПЕРЕДАВАТЬ ОБЪЕКТ !!!
    const params = {
      key1: par1,
      key2: par2,
    };

    const options = { params: params };

    return this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts/',
      options
    );
  }

  // POST-запрос
  sendPostRequest_1(param) {
    const body = {
      data: param,
      title: 'foo',
    };
    return this.httpClient.post(
      // описание post запроса https://jsonplaceholder.typicode.com/guide/
      'https://jsonplaceholder.typicode.com/posts',
      body
    );
  }

  // POST-запрос c заголовками с помощью объекта HttpHeaders
  sendPostRequest_2(param) {
    const body = {
      data: param,
      title: 'foo',
    };

    const myHeaders = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-type', 'application/json; charset=UTF-8');

    return this.httpClient.post(
      'https://jsonplaceholder.typicode.com/posts',
      body,
      { headers: myHeaders }
    );
  }
}