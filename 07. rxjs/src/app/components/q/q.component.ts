import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  ConnectableObservable,
  fromEvent,
  interval,
  timer,
  of,
  ReplaySubject,
  BehaviorSubject,
} from 'rxjs';
import {
  scan,
  buffer,
  debounce,
  take,
  flatMap,
  filter,
  takeUntil,
  retryWhen,
  delay,
  map,
  catchError,
  retry,
  publish,
  refCount,
} from 'rxjs/operators';
import { clear } from 'console';

@Component({
  selector: 'app-q',
  templateUrl: './q.component.html',
  styleUrls: ['./q.component.css'],
})
export class QComponent {
  // ===============================================
  // 17. HTTP пример
  // ===============================================

  // 1:10:47
  posts: string[] = [];

  constructor(private http: HttpClient) {}

  download() {
    this.posts = [];

    // С помощью HttpClient.get() обращаемся к jsonplaceholder, чтобы получить массив постов.
    // Метод get() предоставляет observable объект.
    // Когда этот observable объект выдаст событие, это будет значить, что сервер вернул данные, которые мы можем обрабатывать внутри pipe()

    this.http
      .get('http://jsonplaceholder.typicode.com/posts/')
      .pipe(
        flatMap((response: any) => {
          console.log(response);
          return response;
        }),
        // пропускаем только значения с userId = 5
        filter<any>((post) => post.userId == 5),
        map((post) => post.body)
      )
      .subscribe((post) => {
        this.posts.push(post);
      });
  }
}
