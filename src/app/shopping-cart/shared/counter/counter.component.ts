import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ],
  template: `
    <div class="counter">
      <div
        tabindex="0"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)">
        <div class="button-group">
          <button
            type="button"
            (click)="increment()"
            [disabled]="value === max">
          +
          </button>
          <p>{{ value }}</p>
          <button
            type="button"
            (click)="decrement()"
            [disabled]="value === min">
          -
          </button>
        </div>
      </div>
    </div>
  `
})
export class CounterComponent implements ControlValueAccessor {

  @Input() step = 1;
  @Input() min = 0;
  @Input() max = 20;

  value = 0;

  writeValue(value: number): void {
    this.value = value || 0;
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onKeyDown(event: KeyboardEvent) {
    const handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    };

    console.log(event);
  }

  constructor() { }

  increment() {
    console.log('increment');
  }

  decrement() {
    console.log('decrement');
  }

}
