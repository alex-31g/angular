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

  request_1() {
    // 1 вариан: подписка - вызов метода subscribe() - непосредственно в сервисе
    // this.httpService.sendGetRequest_1();

    // 2 вариан: подписка - вызов метода subscribe() - будет произведена здесь, в месте вызова ф-ции sendGetRequest_1()
    this.httpService.sendGetRequest_1().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  request_2(event) {
    const num = event.target.value;
    console.log('request_2', num);

    this.httpService.sendGetRequest_2(num).subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  request_3(event) {
    const num = event.target.value;
    console.log('request_3', num);

    this.httpService.sendGetRequest_3(num).subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
