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
} from 'rxjs/operators';
import { clear } from 'console';

@Component({
  selector: 'app-l',
  templateUrl: './l.component.html',
})
export class LComponent implements OnInit {
  // ===============================================
  // 12
  // ===============================================

  source: Observable<number>;

  constructor() {}

  // observable может относиться к одному из двух типов - cold или hot.
  // При создании observable, объект по умолчанию становится cold.

  ngOnInit() {
    console.clear();

    // Создаем поток, который с интервалом 500мс в течении 10 раз генерирует значения начиная с 0.
    this.source = interval(500).pipe(take(10));
  }

  // Когда мы нажмем кнопки Subscribe 1 и Subscribe 2, то увидим в консоли,
  // что два разных подписчика получают одинаковые данные, начиная с 0
  // Это и есть cold observable

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

  // cold observable - объект, который для каждого подписчика создает идентичную последовательность событий
  // cold Observable можно сравнить с видео на Youtube - каждый пользователь запустивший видео, не зависимо от момента нажатия на Play,
  // будет смотреть видео с самого начала.
}
