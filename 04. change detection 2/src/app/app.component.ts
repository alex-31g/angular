import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  data = {
    id: 100,
    value: 'hello',
  };

  ngOnInit(): void {
    setTimeout(() => {
      // изменились только свойства объекта - мутация
      // когда мутируется объект - это все еще тот же объект
      // ссылка на него не меняется
      this.data.id++;
      this.data.value = 'world';
    }, 2000);
  }
}
