import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// методы
import { from, of, interval } from 'rxjs';

// операторы
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-g',
  templateUrl: './g.component.html',
})
export class GComponent implements OnInit {
  constructor() {}

  // ===============================================
  // 7. Создание Observable-объектов на основе событий
  // ===============================================

  ngOnInit() {
    console.clear();
  }
}
