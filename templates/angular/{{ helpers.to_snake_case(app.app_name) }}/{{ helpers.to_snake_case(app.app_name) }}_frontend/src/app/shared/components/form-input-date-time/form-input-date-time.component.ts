import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-form-input-date-time',
  templateUrl: './form-input-date-time.component.html',
  styleUrls: ['./form-input-date-time.component.scss']
})
export class FormInputDateTimeComponent {
  controlDate?: FormControl;
  controlTime?: FormControl;
  required = true;
  _control?: AbstractControl | null

  @Input()
  label?: string;

  @Input()
  set control(control: AbstractControl | null) {
    this._control = control;
    this.required = !!control?.hasValidator(Validators.required);
    this.controlDate = new FormControl();
    this.controlTime = new FormControl();
    if (this._control?.value) {
      const isoDate = this._control.value;
      const date = new Date(isoDate)
      this.controlDate?.setValue(date, {emitEvent: false});
      this.controlTime?.setValue(date.toTimeString().substring(0, 5), {emitEvent: false});
    }
    if (this.required) {
      this.controlDate.setValidators([Validators.required]);
      this.controlTime.setValidators([Validators.required]);
    }
    this.controlDate.valueChanges
      .pipe(
        tap(value =>
          this.controlDate?.setValue(
            new Date(value).toISOString().substring(0, 10),
            { emitEvent: false }
          )
        )
      )
      .subscribe(() => this.updateValue());

    this.controlTime.valueChanges
        .subscribe(() => this.updateValue());
  }

  updateValue() {
    if (this.controlDate?.value && this.controlTime?.value) {
      const dateTime = new Date(`${this.controlDate.value}T${this.controlTime.value}`);
      console.log(dateTime)
      console.log(this.control)
      this._control?.setValue(dateTime);
    } else {
      this._control?.setValue(null);
    }
  }
}
