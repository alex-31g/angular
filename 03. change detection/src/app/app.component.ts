import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  p1 = {
    firstname: 'Alex',
    lastname: 'Ts',
  };
  p2 = {
    firstname: 'Joe',
    lastname: 'Doe',
  };

  ngOnInit(): void {}

  changeName1() {
    // изменилось только свойство объекта - мутация
    // когда мутируется объект - это все еще тот же объект
    // ссылка на него не меняется
    this.p1.firstname = 'Foo_1';
  }

  changeName2() {
    // изменилась ссылка на объект
    this.p2 = {
      firstname: 'Foo_2',
      lastname: 'Kooper',
    };
  }
}
