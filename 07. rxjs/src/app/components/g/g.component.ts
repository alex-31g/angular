import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-g',
  templateUrl: './g.component.html',
})
export class GComponent implements AfterViewInit {
  // ===============================================
  // 7. Создание Observable-объектов на основе событий
  // ===============================================

  // В переменной createButton хранится html-кнопка, созданная с помощью шаблонной переменной createBtn.
  // На основании этой кнопки будет создан Observable-объект
  @ViewChild('createBtn')
  createButton: ElementRef; // ссылка на кнопку в шаблоне

  // В переменной stream будет находиться асинхронный поток, созданный на основе событий кнопки
  stream: Observable<any>;

  // В переменной result будет находиться результат, который будет отображен пользователю
  result: string = '';

  constructor() {}

  // Обычно логику пишем внутри события ngOnInit, но здесь мы этого сделать не можем, так как
  // инициализация createButton произойдет в ngAfterViewInit
  ngAfterViewInit() {
    // создание Observable на основе события click с помощью fromEvent()
    // подписчик будет уведомлен при каждом событии click
    this.stream = fromEvent(this.createButton.nativeElement, 'click');

    // Установка обработчика на потоке событий
    this.stream.subscribe(() => {
      this.result += '#';
    });
  }
}
