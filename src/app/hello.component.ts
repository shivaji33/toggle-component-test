import {Component,Input, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'hello',
  template: `
  <div class="toggle-container" [class.disablecheckbox]="disabled">
  <label class="switch" for="checkbox">
    <input type="checkbox" id="checkbox" [(ngModel)]="val"  (ngModelChange)="onChange()" [disabled]="disabled" />
    <div class="slider round"></div>
  </label>
</div>

  `,
  styles: [`
  .toggle-container {
  display: inline-block;
  height: 25px;
  position: relative;
  width: 54px;
}

.toggle-container input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 3px;
  content: "";
  height: 20px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 20px;
}

input:checked + .slider {
  background-color: blue;
}

input:checked + .slider:before {
  transform: translateX(27px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.disablecheckbox {
  opacity: .5;
}
`],
 providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HelloComponent),
      multi: true
    }]
})
export class HelloComponent implements ControlValueAccessor  {
  val = false;
  disabled = false;
  onChangeFn: any = () => {};
  onTouchFn: any = () => {};
    set value(val) {
    this.val = val;
    this.onChangeFn(val);
    this.onTouchFn(val);
  }
   writeValue(value: any){
    this.value = value;
  }

  registerOnChange(fn: any){
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any){
    this.onTouchFn = fn;
  }
  onChange() {
     this.onChangeFn(this.val);
    this.onTouchFn(this.val);
  }
}
