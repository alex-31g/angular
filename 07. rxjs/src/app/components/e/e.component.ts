import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-e',
  templateUrl: './e.component.html',
})
export class EComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 5. Отличие Observable от Promise
  // ===============================================

  ngOnInit() {
    console.clear();

    // Реализуем одинаковую логику с помощью Observable и Promise

    // Promise - параметром принимает ф-цию resolve, которая будет вызвана,
    // когда закончится асинхронная операция
    var promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log('Promise timeout');
        resolve(100);
      }, 1000);

      console.log('Promise started');
    });

    promise.then((value) => {
      console.log('Promise value = ' + value);
    });

    // Observable - параметром принимает объект-наблюдатель observer,
    // которого мы оповещаем каждый раз, когда у нас появились новые данные
    var observable = Observable.create((observer) => {
      var id = setTimeout(() => {
        console.log('Observable timeout');
        observer.next(100);
      }, 1000);

      console.log('Observable started');

      // Ф-ция которая описывает отмену выполнения Observable
      return () => {
        console.log('Observable disposed');
        clearTimeout(id);
      };
    });

    var subscriber = observable.subscribe((value) =>
      console.log('Observable value = ' + value)
    );

    // Отличия между Observable и Promise
    // 1. Если у Observable нет подписчиков - код Observable не будет выполняться. Promise выполнит свой код в любом случае.
    // для проверки этого, поставьте комментарий на строчках 31-34 и 51-53. Сообщение "Promise timeout" будет отображаться в консоли хотя функция then не вызывалась
    // 2. Работу Observable можно отменить вызвав метод unsubscribe. Снимите комментарий кода на строке 62-64.
    // 3. Promise представляет единственное значение, которое является результатом асинхронной операции. Observable может представлять несколько значений.

    // setTimeout(() => {
    //   subscriber.unsubscribe();
    // }, 500);
  }
}
