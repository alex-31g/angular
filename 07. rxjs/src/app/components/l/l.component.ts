import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval, timer, of } from 'rxjs';
import {
  scan,
  buffer,
  debounce,
  take,
  flatMap,
  filter,
  takeUntil,
  retryWhen,
  delay,
  map,
  catchError,
  retry,
} from 'rxjs/operators';

@Component({
  selector: 'app-l',
  templateUrl: './l.component.html',
})
export class LComponent implements OnInit {
  // ===============================================
  // 12
  // ===============================================
}
