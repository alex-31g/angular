import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  ConnectableObservable,
  fromEvent,
  interval,
  timer,
  of,
  ReplaySubject,
  BehaviorSubject,
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
  selector: 'app-p',
  templateUrl: './p.component.html',
})
export class PComponent implements OnInit {
  // ===============================================
  // 16. Subject: BehaviorSubject
  // ===============================================

  // 1:09:07
  constructor() {}

  ngOnInit() {
    console.clear();

    // behavorSubject - объект который работает как Observer и Observable одновременно. При это данный объект сохраняет последнее значение, которое было представлено через метод next. Если к данному объекту создать подписку после того как будет выпущено значение - подписчик получит значение, созданное до подписки.
    // http://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/subjects.html

    // Создаем ReplaySubject и указываем исходное значение 0.
    // Это значение будет использовано если появится подписчик до того, как на этом сабжекте вызовется next()
    var subject = new BehaviorSubject(0);
    //var subject = new ReplaySubject();

    // Далее происходят три события
    subject.next(101); // событие №1
    subject.next(102); // событие №2
    subject.next(103); // событие №3

    // После этого создается подписчик и так как он подписывается на BehaviorSubject после того как произошли три события выше,
    // то ему они не доступны, а ему доступно только последнее событие №3
    var subscription = subject.subscribe(
      (r) => console.log(r),
      (e) => console.error(e),
      () => console.info('completed')
    );

    // Далее происходят еще два события, которые уже доступны подписчику subscription
    subject.next(104);
    subject.next(105);

    subject.complete();

    subscription.unsubscribe();
  }
}
