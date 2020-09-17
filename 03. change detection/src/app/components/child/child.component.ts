import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  @Input() person1;
  @Input() person2;

  ngOnInit(): void {}

  changePerson2() {}
}
