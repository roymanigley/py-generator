import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-boolean',
  templateUrl: './form-input-boolean.component.html',
  styleUrls: ['./form-input-boolean.component.scss']
})
export class FormInputBooleanComponent {
  _control?: FormControl;
  required = true;

  @Input()
  label?: string;
  
  @Input()
  set control(control: AbstractControl | null) {
    this.required = !!control?.hasValidator(Validators.required);
    this._control = control as FormControl;
    if (this.required) {
      this._control?.setValue(!!this._control.value)
    }
  }
}