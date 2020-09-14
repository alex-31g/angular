import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnChanges, OnInit {
  app_data = 'app data';
  isChild = true;

  obj = {
    a: 0,
  };

  a = 0;

  constructor() {
    console.log('app constructor', '\n', this.app_data);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('app ngOnChanges', '\n', changes, this.app_data);
  }
  ngOnInit() {
    console.log('app ngOnInit', '\n', this.app_data);
  }

  addData() {
    this.app_data += ' !!!';
  }

  // Изменяем mutable данные
  // https://www.youtube.com/watch?v=7LLnPxP8Txw
  // (9:00)
  changeMutableData() {
    this.obj.a++;
  }

  // Изменяем immutable данные
  changeImmutableData() {
    this.a++;
  }
}
