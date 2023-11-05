import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../views/layout/layout.module';
import { FormInputTextComponent } from './components/form-input-text/form-input-text.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputDateComponent } from './components/form-input-date/form-input-date.component';
import { FormInputDropdownComponent } from './components/form-input-dropdown/form-input-dropdown.component';
import { FormInputAutocompleteComponent } from './components/form-input-autocomplete/form-input-autocomplete.component';
import { FormInputTextareaComponent } from './components/form-input-textarea/form-input-textarea.component';

@NgModule({
  declarations: [
    FormInputTextComponent,
    FormInputNumberComponent,
    FormInputDateComponent,
    FormInputDropdownComponent,
    FormInputAutocompleteComponent,
    FormInputTextareaComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    LayoutModule,
    FormInputTextComponent,
    FormInputNumberComponent,
    FormInputDateComponent,
    FormInputDropdownComponent,
    FormInputAutocompleteComponent,
    FormInputTextareaComponent
  ]
})
export class SharedModule { }