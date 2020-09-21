import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'app-immutable-list',
  templateUrl: './immutable-list.component.html',
})
export class ImmutableListComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('======= List =======');

    // Создаем пустой immutable массив с помощью метода List
    let list = List<Video>();

    // push - возвращает новый массив с добавленным значением
    list = list.push(new Video(100, 'Angular Essential'));
    list = list.push(new Video(101, 'Angular Advanced'));
    list = list.push(new Video(102, 'Angular CLI'));

    // ф-ция count() входит в состав метода List
    console.log('list.count ' + list.count());
  }
}
class Video {
  constructor(public id: number, public name: string) {}
}
