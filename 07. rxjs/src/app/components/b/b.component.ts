import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
})
export class BComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 2. Отписка от Observable-объекта - 1
  // ===============================================

  ngOnInit() {
    console.clear();

    // Создаем Observable-объект, который выдаст первое событие через 2с
    var source = new Observable(function (observer) {
      setTimeout(function () {
        console.log('timeout');
        observer.next(100);
        observer.complete();
      }, 2000);

      console.log('start');
    });

    // Создаем подписчиков
    var sub = source.subscribe(
      function (value) {
        console.log('next ' + value);
      },
      function (error) {
        console.error(error);
      },
      function () {
        console.log('completed');
      }
    );

    setTimeout(function () {
      sub.unsubscribe();
      console.log('unsubscribed');
    }, 1000);

    // Через 1с - произойдет отписка от Observable-объекта с помощью sub.unsubscribe(), то-есть мы перестаем наблюдать за потоком.
    // В консоли мы получим следующее:

    // start         --> запустился Observable
    // unsubscribed  --> подписчик отписался от потока
    // timeout       --> но при этом сам Observable продолжает работать

    // Так как мы видим в консоли timeout, это говорит о том, что асинхронная операция продолжается
    // даже несмотря на то, что у нас произошла отписка от потока, то-есть никто не ожидает результата работы
    // асинхронной операции

    // !!!
    // Для того, чтобы метод unsubscribe() смог прекратить не нужную нам уже асинхронную операцию
    // нужно изменить код при создании Observable-объекта (смотри c.component)
  }
}
