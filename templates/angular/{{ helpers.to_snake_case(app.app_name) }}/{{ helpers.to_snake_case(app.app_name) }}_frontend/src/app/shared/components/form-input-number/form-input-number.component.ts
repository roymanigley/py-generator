import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrls: ['./form-input-number.component.scss']
})
export class FormInputNumberComponent {

  _control?: FormControl;
  step?: string;
  required?: boolean;

  @Input()
  label?: string;

  @Input()
  set type(type: 'int' | 'float') {
    if (type === 'int') {
      this.step = '0.';
    } else {
      this.step = '0.000';
    }
  }
  
  @Input()
  set control(control: AbstractControl | null) {
    this.required = control?.hasValidator(Validators.required);
    this._control = control as FormControl;
  }
}
