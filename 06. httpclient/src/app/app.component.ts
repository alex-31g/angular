import { Component, OnInit } from '@angular/core';

import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  users;
  num1: any;

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
      (data) => {
        this.users = data;
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
      (data) => {
        this.users = data;
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
      (data) => {
        this.users = data;
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
      (data) => {
        this.users = data;
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
      (data) => {
        this.users = data;
        console.log('POST', this.users);
      },
      (error) => {
        console.log('POST', error);
      }
    );
  }
}
