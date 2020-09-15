import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
})
export class ChildComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  // child_data - входное свойство (так как помечено декоратором @Input), получаемое от родителя
  @Input()
  child_data: any = 'child data';

  @Input() child_data_2 = {
    a: 10,
  };
  @Input() child_data_3 = 1000;

  // Конструктор - это метод класса, который выполняется при создании экземпляра класса.
  // Конструктор не должен выполнять никакую «работу».
  // Вся работа в компоненте выполняется в хуке ngOnInit.
  constructor() {
    console.warn('child constructor', '\n', this.child_data);
  }

  // Lifecycle hooks срабатывают после того, как отработал constructor.

  // ngOnChanges вызывается:
  // 1) один раз после constructor, если есть immutable @Input-свойств
  // 2) при каждом изменении immutable @Input-свойств
  // ngOnChanges параметром принимает объект класса SimpleChanges, который содержит предыдущие и текущие значения @Input-свойств
  ngOnChanges(changes: SimpleChanges): void {
    console.warn('child ngOnChanges', '\n', changes, '\n', this.child_data);
  }

  // ngOnInit вызывается:
  // 1) один раз при установке 'обычных' свойств после первого вызова метода ngOnChanges (если он был вызван)
  // 2) один раз при установке 'обычных' свойств после constructor (если метод ngOnChanges не был вызван)
  ngOnInit(): void {
    console.warn('child ngOnInit', '\n', this.child_data);
  }

  // ngDoCheck вызывается:
  // - при каждом изменении mutable и immutable @Input-свойств, после методов ngOnChanges и ngOnInit
  ngDoCheck(): void {
    console.warn('child ngDoCheck', '\n', this.child_data);
  }

  // ngAfterContentInit вызывается:
  // - только один раз, после метода ngDoCheck(), после вставки содержимого в представление компонента html
  ngAfterContentInit(): void {
    console.warn('child ngAfterContentInit', '\n');
  }

  // ngAfterContentChecked вызывается:
  // 1) один раз после ngAfterContentInit
  // 2) при каждом изменении представления, после ngDoCheck()
  ngAfterContentChecked(): void {
    console.warn('child ngAfterContentChecked', '\n');
  }

  // ngAfterViewInit вызывается:
  // 1) если нет дочерних компонентов - только один раз, после первого вызова метода ngAfterContentChecked()
  // 2) если есть дочерние компоненты - после инициализации представлений дочернего компонента, после метода ngAfterViewChecked дочернего компонента
  ngAfterViewInit(): void {
    console.warn('child ngAfterViewInit', '\n');
  }

  // ngAfterViewChecked вызывается:
  // 1) один раз после ngAfterViewInit
  // 2) после ngAfterContentChecked() при каждом изменении представления компонента или представление дочернего компонента
  ngAfterViewChecked(): void {
    console.warn('child ngAfterViewChecked', '\n');
  }

  // ngOnDestroy - срабатывает при удалении компонента из DOM-дерева - например, при переходе на другой URL или с помощью *ngIf.
  // Основная цель ngOnDestroy - выполнить чистку приложения перед тем, как Angular удалит директиву/компонент, чтобы избежать утечек памяти.
  // Внутри ngOnDestroy можно отменять подписку Observables, отсоединять обработчиков событий, останавливать таймеры и т.д.
  ngOnDestroy(): void {
    console.warn('child ngOnDestroy', '\n', this.child_data);
  }
}
