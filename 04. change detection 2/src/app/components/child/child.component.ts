import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnChanges, DoCheck {
  // Данные, которые приходят в settings из родительского компонента - мутировавшие,
  // так как меняются только их свойства, а ссылка остается прежней.
  // Из-за того что у нас установлен OnPush - мы никогда не увидим их на экране,
  // так как `процесс обнаружения изменений - change detection` не будет запущен и перерисовки DOM не произойдет.
  // Чтобы решить эту проблему, мы воспользуемся сервисом ChangeDetectorRef
  @Input() settings;
  id: number;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    // данные в settings пришли от родителя и с ними можно работать, но так
    // установлен OnPush - мы никогда не увидим их на экране
    console.log('settings => ', this.settings);

    // Чтобы решить эту проблему, мы воспользуемся сервисом ChangeDetectorRef,
    // но перед этим запоминаем предыдущее значение this.settings.id,
    // так как в родителе задано, что это значение через 2с будет изменено
    this.id = this.settings.id;
  }

  // ngDoCheck срабатывает постоянно, даже если @Input-свойство не поменялось.
  // Поэтому внутри даного метода мы можем самостоятельно обновить текущий компонент
  // с помощью ChangeDetectorRef, если это потребуется
  ngDoCheck() {
    if (this.id != this.settings.id) {
      this.id = this.settings.id;
      // ChangeDetectorRef.markForCheck - помечает компонент и всех его родителей,
      // что они должны быть проверены в `процессе обнаружения изменений - change detection`
      this.cd.markForCheck();
    }
  }
}
