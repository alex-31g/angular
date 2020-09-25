import { Component, OnInit } from '@angular/core';

import { HttpService } from './services/http.service';

import { delay } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  users;
  loading = false;
  red = 'red';

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {}

  // ========================
  // GET
  // ========================

  request_1() {
    // 1 вариан: подписка - вызов метода subscribe() - непосредственно в сервисе
    // this.httpService.sendGetRequest_1();

    // 2 вариан: подписка - вызов метода subscribe() - будет произведена здесь, в месте вызова ф-ции sendGetRequest_1()
    this.httpService.sendGetRequest_1().subscribe(
      (response) => {
        this.users = response;
        console.log('GET_1', this.users);
      },
      (error) => {
        console.log('GET_1', error);
      }
    );
  }

  request_2(event) {
    const num = event.target.value;

    this.httpService.sendGetRequest_2(num).subscribe(
      (response) => {
        this.users = response;
        console.log('GET_2', this.users);
      },
      (error) => {
        console.log('GET_2', error);
      }
    );
  }

  request_3(event) {
    const num = event.target.value;

    this.httpService.sendGetRequest_3(num).subscribe(
      (response) => {
        this.users = response;
        console.log('GET_3', this.users);
      },
      (error) => {
        console.log('GET_3', error);
      }
    );
  }

  // ========================
  // POST
  // ========================

  request_4(event) {
    const num = event.target.value;

    this.httpService.sendPostRequest_1(num).subscribe(
      (response) => {
        this.users = response;
        console.log('POST', this.users);
      },
      (error) => {
        console.log('POST', error);
      }
    );
  }

  request_5(event) {
    const num = event.target.value;

    this.httpService.sendPostRequest_2(num).subscribe(
      (response) => {
        this.users = response;
        console.log('POST', this.users);
      },
      (error) => {
        console.log('POST', error);
      }
    );
  }

  // ========================
  // RxJS операторы
  // ========================

  // После выполнения запроса, и до того как была выполнена подписка с помощью subscribe(), можно работать со стримом (потоком) с помощью rxjs-метода pipe(), который позволяет обработать результаты запроса.
  // В примере ниже добавим искуственную задержку с помощью ф-ции delay(), которую заранее нужно импортировать.
  request_6() {
    this.loading = true;

    this.httpService
      .sendGetRequest_1()
      .pipe(delay(1500))
      .subscribe((response) => {
        this.users = response;
        console.log('RxJS', this.users);

        this.loading = false;
      });
  }

  // ========================
  // DELETE
  // ========================

  request_7(event) {
    const id = event.target.value;
    this.httpService.sendDeleteRequest(id).subscribe((response) => {
      console.log(
        'DELETE - смотри вкладку Network --> Headers --> там должно быть Request Method: DELETE',
        '\n',
        response
      );
    });
  }
}
