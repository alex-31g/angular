import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  ConnectableObservable,
  fromEvent,
  interval,
  timer,
  of,
  ReplaySubject,
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
  selector: 'app-o',
  templateUrl: './o.component.html',
})
export class OComponent implements OnInit {
  // ===============================================
  // 15. Subject: ReplaySubject
  // ===============================================

  // 1:06:21

  constructor() {}

  ngOnInit() {
    console.clear();

    // Subject - объект который работает как Observer и Observable одновременно.
    // http://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/subjects.html

    // Subject бывает ReplaySubject и BehaviorSubject

    // Создание ReplaySubject
    var subject = new ReplaySubject();

    // Подписываемся на событие, которое этот сабжект может выдать
    var subscription = subject.subscribe(
      (r) => console.log('подписчик 1', r),
      (e) => console.error(e),
      () => console.info('подписчик 1', 'completed')
    );

    // Снова подписываемся на событие, которое этот сабжект может выдать
    var subscription2 = subject.subscribe(
      (r) => console.log('подписчик 2', r),
      (e) => console.error(e),
      () => console.info('подписчик 2', 'completed')
    );

    // Генерируем события сабжекта
    // При вызове next() сработает ф-ция на 55 строке для подписчика 1 и 62 строке для подписчика 2
    subject.next(1);
    subject.next(2);
    subject.next(3);

    // Генерируем события сабжекта
    // При вызове next() сработает ф-ция на 57 строке для подписчика 1 и 64 строке для подписчика 2
    subject.complete();

    subscription.unsubscribe();
    subscription2.unsubscribe();

    // ReplaySubject - проигрывает для каждого подписчика все события которые были до и после подписки
  }
}
