import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-d',
  templateUrl: './d.component.html',
})
export class DComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 4. Оповещение об ошибках Observable-объекта, которые могут возникнуть в результате асинхронной операции
  // ===============================================

  ngOnInit() {
    console.clear();

    // создание Observable
    var source = Observable.create(function (observer) {
      // Внутри setTimeout мы имитируем обращение к серверу ...
      var id = setTimeout(function () {
        // ... и в процессе этого обращение имитируем, что произошла ошибка ...
        try {
          throw '404'; // исключение
        } catch (error) {
          // ... отлавливаем это исключение и с помощью error() оповещаем всех подписчиков
          observer.error(error);
        }
      }, 2000);

      console.log('start');

      return function () {
        console.log('Произошла отписка');
        clearTimeout(id);
      };
    });

    var subject = source.subscribe(
      function (value) {
        console.log('next ' + value);
      },

      // При возникновении ошибки в Observable-объекте будет запущена вторая ф-ция-обработчик
      // (второй параметр subscribe)
      function (error) {
        console.error('В Observable ошибка: ' + error);
      },

      function () {
        console.log('completed');
      }
    );

    // В консоли мы увидим следующее:
    // start
    // В Observable ошибка: 404
    // Произошла отписка - отписка всегда происходит в случаи возникновения ошибки у Observable
  }
}
