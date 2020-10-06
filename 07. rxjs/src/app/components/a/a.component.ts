import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
})
export class AComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 1. Создание Observable-объекта и его подписчиков
  // ===============================================

  ngOnInit() {
    console.clear();

    // Создадим простой Observable, задача которого - через 1.5с с помощью next() выдать наблюдателям данные,
    // и с помощью complete() - оповестить наблюдателей, что поток завершился и новой информации не будет

    // 1й способ создания Observable
    // var source = Observable.create(function (observer) {

    // 2й способ создания Observable
    var source = new Observable(function (observer) {
      // В реальном приложении фрагмент внутри setTimeout - это асинхронная операция -
      // например, обращение к серверу и другие действия, которые занимают большой отрезок времени
      setTimeout(function () {
        console.log('timeout');
        observer.next(100); // оповещение наблюдателя о новом элементе в последовательности
        observer.complete(); // оповещение наблюдателя о завершении последовательности
      }, 1500);

      console.log('start');
    });

    // Теперь source - это поток с которого можно черпать данные.
    // Cоздание подписчика выполняется с помощью метода subscribe(), который принимает три обработчика
    var sub = source.subscribe(
      // 1й метод - сработает, когда в Observable произойдет событие next()
      function (value) {
        console.log('next ' + value);
      },

      // 2й метод - сработает, когда в Observable произойдет событие-ошибка error() - смотри d.component
      function (error) {
        console.error(error);
      },

      // 3й метод - сработает, когда в Observable произойдет событие complete()
      function () {
        console.log('completed');
      }
    );
  }
}
