import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  DoCheck,
  Input,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'grand-child',
  templateUrl: './grand-child.component.html',
})
export class GrandChildComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  data: number = 7;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.warn('GRAND child ngOnChanges', '\n', changes, '\n');
  }
  ngOnInit(): void {
    console.warn('GRAND child ngOnInit', '\n');
  }

  ngDoCheck(): void {
    console.warn('GRAND child ngDoCheck', '\n');
  }

  ngAfterContentInit(): void {
    console.warn('GRAND child ngAfterContentInit', '\n');
  }

  ngAfterContentChecked(): void {
    console.warn('GRAND child ngAfterContentChecked', '\n');
  }

  ngAfterViewInit(): void {
    console.warn('GRAND child ngAfterViewInit', '\n');
  }

  ngAfterViewChecked(): void {
    console.warn('GRAND child ngAfterViewChecked', '\n');
  }

  ngOnDestroy(): void {
    console.warn('GRAND child ngOnDestroy', '\n');
  }

  changeData() {
    this.data++;
  }
}
