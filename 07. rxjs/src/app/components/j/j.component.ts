import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval, timer } from 'rxjs';
import {
  scan,
  buffer,
  debounce,
  take,
  flatMap,
  map,
  filter,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-j',
  templateUrl: './j.component.html',
})
export class JComponent implements AfterViewInit {
  // ===============================================
  // 10. RXJS операторы:  filter, takeUntil
  // ===============================================

  output: string = '';

  @ViewChild('toggleBtn')
  toggleBtn: ElementRef;

  constructor() {}

  // 50:49

  ngAfterViewInit() {
    // Cоздание стрима на основе события change для input с помощью fromEvent().
    // stream1 будет выдавать события true/false
    let stream1 = fromEvent<Event>(this.toggleBtn.nativeElement, 'change').pipe(
      map((x) => (x.target as HTMLInputElement).checked)
    );

    // Создаем еще один стрим, который каждые 500мс создает '-'
    let stream2 = interval(500).pipe(map(() => '-'));

    // Теперь нужно сделать так, чтоб stream2 создавал черточки только тогда, когда stream1 выдает событие true

    // Для этого создаем третий стрим, который фильтрует stream1 с помощью filter(), выбирая только те его события, которые равны true
    let resultStream = stream1.pipe(
      filter((x) => x === true),
      // stream2.takeUntil(stream1) поток stream2 будет выдавать события до тех пор пока поток stream1 не выдаст события, после чего поток resultStream не будет выдавать событий до повторного события от потока stream1

      // Если значение на stream1 = true, то с помощью flatMap мы начинаем работать с событиями stream2.
      // Но нам нужно чтобы stream2 работал только до следующего изменения на stream1.
      // Для этого используем takeUntil(), передавая ему stream1
      flatMap(() => stream2.pipe(takeUntil(stream1)))
    );

    resultStream.subscribe((x) => (this.output += x));
  }
}
