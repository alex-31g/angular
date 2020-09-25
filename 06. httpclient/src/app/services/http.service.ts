import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  // ========================
  // Наблюдатель и стрим
  // ========================

  // Все методы сервиса HttpClient возвращают объект Observable, который является частью библиотеки rxjs.
  // Наблюдатель (Observable) представляет своего рода поток (стрим), и для прослушивания событий из этого потока применяется метод подписки subscribe(), которому можно передавать 3 колбека (функции-обработчики):
  // 1 - имеет параметр response - выполнится в случае успешного ответа от сервера
  // 2 - имеет параметр error - в случае ошибки, которую мы можем обработать
  // 3 - без параметров - вызывается, когда стрим завершился

  // ========================
  // МЕТОД GET - используется получения данных
  // ========================

  // GET-запрос - принимает минимум 1 параметр - строку запроса
  // Второй параметр - опциональный объект options с опциями, в который можно передавать различные свойства (например headers, params, observe)

  // Для выполнения GET-запроса у объекта HttpClient вызывается метод get(), в который передается адрес запроса
  sendGetRequest_1(): Observable<any> {
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
  sendGetRequest_2(param): Observable<any> {
    return this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts/${param}`
    );
  }

  // ========================
  // PARAMS в объекте options
  // ========================

  // GET-запроса с параметрами (вариант 2) -
  // параметры передаются вторым аргументом в конфигурационный объект со свойством params

  // Если нужно получить строку запроса в которой присутствуют параметры вида '?param1=100&param2=200' -
  // можно использовать метод set или свойства fromString и fromObject объекта HttpParams, с помощью которых устанавливаются параметры, и затем этот объект передается в запрос
  sendGetRequest_3(par1): Observable<any> {
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

  // ========================
  // МЕТОД POST - используется для создания данных
  // ========================

  // POST-запрос - принимает минимум 2 параметра - строку запроса и объект body (данные, которые отправляются на сервер).
  // Третий параметр - опциональный объект options с опциями, в который можно передавать различные свойства (например headers, params, observe)
  sendPostRequest_1(param): Observable<any> {
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

  // ========================
  // HEADERS в объекте options
  // ========================

  // POST-запрос c заголовками с помощью объекта HttpHeaders.
  // Хедеры передаются третьим параметром в объекте опций
  sendPostRequest_2(param): Observable<any> {
    const body = {
      data: param,
      title: 'foo',
    };

    // создаем объект хедеров - вариант 1
    // const myHeaders = new HttpHeaders()
    //   .set('Authorization', 'my-auth-token')
    //   .set('Content-type', 'application/json; charset=UTF-8');

    // создаем объект хедеров - вариант 2
    const myHeaders = new HttpHeaders({
      Authorization: 'my-auth-token',
      'Content-type': 'application/json; charset=UTF-8',
      MyCustomHeader: 'lol',
    });

    return this.httpClient.post(
      'https://jsonplaceholder.typicode.com/posts',
      body,
      { headers: myHeaders }
    );
  }

  // ========================
  // МЕТОД DELETE - используется для удаления данных
  // ========================

  sendDeleteRequest(id): Observable<any> {
    return this.httpClient.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }

  // ========================
  // МЕТОД PUT - используется для обновления данных
  // ========================

  // POST-запрос - принимает минимум 2 параметра - строку запроса и объект body (данные, которые которые должны быть модифицированы).
  sendPutRequest(id): Observable<any> {
    return this.httpClient.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed: true } // изменяем поле completed
    );
  }

  // ========================
  // OBSERVE в объекте options
  // ========================

  // По умолчанию HttpClient возвращает только поле body - тело ответа, а поля headers, status, statusText и др. не возвращает.
  // За такое поведение отвечает свойство observe со значением 'body' (значение по умолчанию) в объекте options.
  // Данное свойство может принимать и другие значения - 'events' или 'response':
  // 'response' - будет получен полный ответ от сервера с полями headers, status, statusText и др.
  // 'events' - позволяет получить доступ ко всем событиям, которые происходят с асинхронным запросом (пример событий - запрос подготовлен, запрос отправлен, запрос ожидается, запрос пришел). На каждое событие мы получаем event, который мы может обрабатывать внутри rxjs-метода tap(). Таким образом мы получаем детальным доступ ко всем этапам выполнения запроса.

  // observe: 'response'
  sendGetRequest_observe(): Observable<any> {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts/1`, {
      observe: 'response',
    });
  }

  // observe: 'events'
  sendGetRequest_observe_2(): Observable<any> {
    return this.httpClient
      .get(`https://jsonplaceholder.typicode.com/posts/1`, {
        observe: 'events',
      })
      .pipe(
        // tap() - rxjs-оператор, перехватывает event
        tap((event) => {
          // HttpEventType - это константы, которые описывают состояние запроса.
          // Мы сравниваем тип нашего события с этими константами и выполняем некую логику на каждом этапе выполнения запроса.

          // запрос отправлен
          if (event.type === HttpEventType.Sent) {
            console.log('Sent =>', event);
          }
          // запрос пришел
          if (event.type === HttpEventType.Response) {
            console.log('Response =>', event);
          }
        })
      );
  }
}
