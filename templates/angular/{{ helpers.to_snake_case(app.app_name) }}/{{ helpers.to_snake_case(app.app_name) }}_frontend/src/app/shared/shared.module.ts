import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../views/layout/layout.module';
import { FormInputTextComponent } from './components/form-input-text/form-input-text.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputDateComponent } from './components/form-input-date/form-input-date.component';
import { FormInputDropdownComponent } from './components/form-input-dropdown/form-input-dropdown.component';
import { FormInputAutocompleteComponent } from './components/form-input-autocomplete/form-input-autocomplete.component';
import { FormInputTextareaComponent } from './components/form-input-textarea/form-input-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputDateTimeComponent } from './components/form-input-date-time/form-input-date-time.component';
import { FormInputBooleanComponent } from './components/form-input-boolean/form-input-boolean.component';

@NgModule({
  declarations: [
    FormInputTextComponent,
    FormInputNumberComponent,
    FormInputDateComponent,
    FormInputDateTimeComponent,
    FormInputDropdownComponent,
    FormInputAutocompleteComponent,
    FormInputTextareaComponent,
    FormInputBooleanComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutModule,
    FormInputTextComponent,
    FormInputNumberComponent,
    FormInputDateComponent,
    FormInputDateTimeComponent,
    FormInputDropdownComponent,
    FormInputAutocompleteComponent,
    FormInputTextareaComponent,
    FormInputBooleanComponent
  ]
})
export class SharedModule { }