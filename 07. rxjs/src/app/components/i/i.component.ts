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

    // ======================

    // // map - применяет указанную функцию к каждому значению, которое предоставил источник (Observable)
    // let source = interval(100).pipe(
    //   take(10),
    //   map((x) => x * 2)
    // );
    // source.subscribe((x) => console.log(x));

    // ======================

    // let source = interval(100).pipe(
    //   take(10),
    //   map((x) =>
    //     timer(500).pipe(
    //       map(() => x)
    //       // для каждого значения из источника выполняется асинхронная операция (timer(500))
    //       // после данной операции источник предоставляет значения, которые представляют новые источники (Observable)
    //     )
    //   )
    // );
    // source.subscribe((x) => console.log(x.toString())); // x новый Observable из источника source

    // ======================

    // let source = interval(100).pipe(
    //   take(10),
    //   // flatMap подписываеться на событие от каждого Observable определенного в параметрах
    //   // http://reactivex.io/documentation/operators/flatmap.html
    //   flatMap(
    //     //
    //     (x) => timer(500).pipe(map(() => x))
    //   )
    // );
    // source.subscribe((x) => console.log(x));

    // ======================
  }
}
