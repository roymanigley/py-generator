import { Component } from '@angular/core';

@Component({
  selector: 'app-form-input-date',
  templateUrl: './form-input-date.component.html',
  styleUrls: ['./form-input-date.component.scss']
})
export class FormInputDateComponent {

  _control?: FormControl;
  required?: boolean;

  @Input()
  label?: string;

  @Input()
  set control(control: AbstractControl | null) {
    this.required = control?.hasValidator(Validators.required);
    this._control = control as FormControl;
  }
}
