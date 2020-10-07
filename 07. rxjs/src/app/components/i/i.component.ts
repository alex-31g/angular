import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval, timer } from 'rxjs';
import { scan, buffer, debounce, take, flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-i',
  templateUrl: './i.component.html',
})
export class IComponent implements OnInit {
  // ===============================================
  // 9. RXJS операторы: take, map, flatMap. <br /> RXJS метод: timer
  // ===============================================

  ngOnInit() {
    console.clear();

    // 44:35 ======================

    // // map - применяет функцию, полученную в качестве параметра, к каждому значению, которое предоставил источник (Observable), и возвращает её результат.

    // // С помощью interval() создаем поток, в котором каждые 100мс будет появляться новое событие и в этом событии производит инкрементацию счетчика начиная с 0
    // let source1 = interval(100).pipe(
    //   // Ограничим этот поток десятью событиями с помощью take()
    //   take(10),
    //   map((x, i) => {
    //     console.log('индекс текущего значения =', i);
    //     return x * 2;
    //   })
    // );
    // source1.subscribe((x) => console.log(x));

    // 45:54 ======================

    // let source2 = interval(100).pipe(
    //   take(10),
    //   map((x) =>
    //     timer(500).pipe(
    //       map(() => x)
    //       // для каждого значения из источника выполняется асинхронная операция (timer(500))
    //       // после данной операции источник предоставляет значения, которые представляют новые источники (Observable)
    //     )
    //   )
    // );
    // source2.subscribe((x) => console.log(x.toString())); // x новый Observable из источника source

    // 48:39 ======================

    let source3 = interval(100).pipe(
      take(10),
      // flatMap подписывается на событие от каждого Observable определенного в параметрах
      // http://reactivex.io/documentation/operators/flatmap.html
      flatMap((x) => timer(500).pipe(map(() => x)))
    );
    source3.subscribe((x) => console.log(x));

    // ======================
  }
}
