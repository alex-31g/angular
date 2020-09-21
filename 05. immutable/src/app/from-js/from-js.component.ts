import { Component, OnInit } from '@angular/core';
import { Map, fromJS } from 'immutable';

@Component({
  selector: 'app-from-js',
  templateUrl: './from-js.component.html',
})
export class FromJsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('======= fromJS =======');

    let video = {
      id: 100,
      name: 'Angular CLI',
      address: {
        host: 'https://it.com',
        url: 'https://it.com/ru/video/angular_cli',
      },
    };

    // Метод fromJS делает immutable все вложенные объекты
    let map2 = fromJS(video);

    // Метод setIn - изменить/добавить вложенное свойство.
    // Этом метод возвращает новый измененный объект, исходный объект не меняется
    // С помощью метода setIn в map3 мы получаем все данные map2, а также изменяем вложенное свойство map3.address.url
    let map3 = map2.setIn(['address', 'url'], 'http://x.com');

    console.log(map2.get('address').get('url'));
    console.log(map3.get('address').get('url'));
  }
}
