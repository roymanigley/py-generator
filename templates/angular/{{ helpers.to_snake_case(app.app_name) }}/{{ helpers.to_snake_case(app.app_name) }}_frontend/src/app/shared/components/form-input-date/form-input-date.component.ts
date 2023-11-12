import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-date',
  templateUrl: './form-input-date.component.html',
  styleUrls: ['./form-input-date.component.scss']
})
export class FormInputDateComponent {
  _control?: FormControl;
  required = true;

  @Input()
  label?: string;

  @Input()
  set control(control: AbstractControl | null) {
    this.required = !!control?.hasValidator(Validators.required);
    this._control = control as FormControl;
    this._control.valueChanges
      .subscribe(value =>
        this._control?.setValue(
          new Date(value).toISOString().substring(0, 10),
          { emitEvent: false }
        )
      );
  }
}