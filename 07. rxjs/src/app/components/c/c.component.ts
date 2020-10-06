import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
})
export class CComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 3. Отписка от Observable-объекта - 2
  // ===============================================

  ngOnInit() {
    console.clear();

    var source = new Observable(function (observer) {
      // Сохраняем значение setTimeout в переменную id
      let id = setTimeout(function () {
        console.log('timeout');
        observer.next(100);
        observer.complete();
      }, 2000);

      console.log('start');

      // При вызове у подписчиков unsubscribe(), будет вызываться данная ф-ция
      return function () {
        clearInterval(id);
      };
    });

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
    // unsubscribed  --> подписчик отписался от потока и timeout мы не увидим
  }
}
