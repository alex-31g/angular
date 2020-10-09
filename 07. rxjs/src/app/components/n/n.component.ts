import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  ConnectableObservable,
  fromEvent,
  interval,
  timer,
  of,
} from 'rxjs';
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
  publish,
  refCount,
} from 'rxjs/operators';
import { clear } from 'console';

@Component({
  selector: 'app-n',
  templateUrl: './n.component.html',
})
export class NComponent implements OnInit {
  // ===============================================
  // 14. hot observable connect
  // ===============================================

  // source: ConnectableObservable<number>;
  source: any;

  constructor() {}

  ngOnInit() {
    console.clear();

    this.source = interval(500).pipe(
      take(10),
      publish() // сделать поток событий общим для всех
    );

    // connect() - начать выдавать события, даже если еще нет подписчиков.
    this.source.connect();
  }

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
}
