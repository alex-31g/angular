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

@Component({
  selector: 'app-k',
  templateUrl: './k.component.html',
})
export class KComponent implements OnInit {
  // ===============================================
  // 11. RXJS: обработка ошибок catchError, retry, retryWhen
  // ===============================================
  constructor() {}

  ngOnInit() {
    console.clear();

    // Создаем поток с помощью of()
    var source = of(1, 2, 3, 4, 5, 6)
      .pipe(
        map((x) => {
          // если событие стрима == 4, выбрасываем ошибку
          if (x == 4) throw 'error';
          return x;
        })

        // попытаться перезапустить Observable указанное количество раз
        // в итоге получим: 123 123 123 'error text' 'done'
        // retry(2)

        // перезапустить с интервалом в 1 сек. два раза
        // в итоге получим: 123 123 123 'done'
        // при этом подписчик не получит 'error text'
        // retryWhen((err) => err.pipe(delay(1000), take(2)))
      )

      // Когда будет получено исключение, оно будет передено в этот блок кода,
      // в результате чего подписчику будет передано сообщение 'error text'
      // catchError() - возвратит новый поток с текстом 'error text'
      .pipe(catchError(() => of('error text')));

    // Подписчик получит следующие данные: 123 'error text'
    // 56 - не будет получено, так как случилась ошибка
    source.subscribe(
      (x) => console.log('Im subscribe:', x),
      (error) => console.error(error),
      () => console.log('done')
    );
  }
}
