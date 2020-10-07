import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval } from 'rxjs';
import { scan, buffer, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-h',
  templateUrl: './h.component.html',
})
export class HComponent implements AfterViewInit {
  // ===============================================
  // 8. RXJS операторы: scan, buffer, debounce
  // ===============================================

  // В переменной generateButton хранится html-кнопка, созданная с помощью шаблонной переменной generateButton.
  // На основании этой кнопки будет создан Observable-объект
  @ViewChild('generateButton')
  generateButton: ElementRef; // ссылка на кнопку в шаблоне

  // В переменной stream будет находиться асинхронный поток, созданный на основе событий кнопки
  stream: Observable<any>;

  // В переменной result будет находиться результат, который будет отображен пользователю
  result: string = '';

  constructor() {}

  ngAfterViewInit() {
    // создание Observable-поток на основе события click с помощью fromEvent()
    // подписчик будет уведомлен при каждом событии click
    this.stream = fromEvent(this.generateButton.nativeElement, 'click');

    // До того как была выполнена подписка с помощью subscribe(), можно работать со стримом (потоком) с помощью rxjs-метода pipe(),
    // внутри которого используем rxjs-операторы
    this.stream
      .pipe(
        // scan выполняет функцию для каждого значения в потоке
        // принимает два аргумента:
        // - функцию, вызываемую при каждом новом значении Observable;
        // - начальное значение промежуточного результата.
        // !!! Когда мы работаем с потоками на основе пользовательских событий (напр. click), то значения которые приходят от потока - пустые !!!
        scan((x) => x + 1, 5), // при вызове ф-ции scan в первый раз x = 5

        // buffer(Observable) - собирает значения в массиве до тех пор, пока observable-поток,
        // который находится у него в параметре, не выдаст событие
        buffer(
          this.stream.pipe(
            // debounce() - возвращает последнее событие потока
            // В качестве аргумента передается функция, определяющая интервал времени передачи последнего значения
            // То-есть, если интервал между двумя кликами меньше чем 1с - событие не будет возвращено
            debounce(() => interval(1000))
          )
        )
      )
      .forEach((x) => this.send(x));
  }

  // send() преобразует массив в строку JSON и выводит на экран
  send(data) {
    this.result += JSON.stringify(data);
  }
}
