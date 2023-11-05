import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss']
})
export class FormInputTextComponent {

  _control?: FormControl;
  required?: boolean;

  @Input()
  label?: string;
  
  @Input()
  set control(control: AbstractControl | null) {
    this.required = !!control?.hasValidator(Validators.required);
    this._control = control as FormControl;
  }
}
