import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval, timer, of } from 'rxjs';
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
  selector: 'app-m',
  templateUrl: './m.component.html',
})
export class MComponent implements OnInit {
  // ===============================================
  // 13. hot observable: publish, refCount
  // ===============================================

  source: Observable<number>;

  constructor() {}

  // observable может относиться к одному из двух типов - cold или hot.
  // При создании observable, объект по умолчанию становится cold.

  // hot observable - объект, который для всех подписчика использует один поток событий
  // hot observable можно сравнить с прямой трансляцией на Youtube - каждый пользователь просматривает видео с того момента как подключился к трансляции

  ngOnInit() {
    console.clear();

    // Создаем поток, который с интервалом 500мс в течении 10 раз генерирует значения начиная с 0.
    this.source = interval(500).pipe(
      take(10),
      publish(), // сделать поток событий общим для всех

      // refCount() - начать выдавать события при появлении первого подписчика
      // Все послудующие подписчики будут получать текущие события, которые появились на момент их подключения,
      // не видя предыдущих
      refCount()
    );
  }

  subscribe1() {
    this.source.subscribe((value) => {
      console.log('Subscriber 1 received a value ' + value);
    });
  }

  subscribe2() {
    this.source.subscribe((value) => {
      console.log('        Subscriber 2 received a value ' + value);
    });
  }
}
