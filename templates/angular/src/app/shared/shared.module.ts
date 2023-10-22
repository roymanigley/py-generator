import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../views/layout/layout.module';
import { FormInputTextComponent } from './components/form-input-text/form-input-text.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputDateComponent } from './components/form-date-date/form-input-date.component';
import { FormInputDropdownComponent } from './components/form-input-dropdown/form-input-dropdown.component';


@NgModule({
  declarations: [
    FormInputTextComponent,
    FormInputNumberComponent,
    FormInputDateComponent,
    FormInputDropdownComponent
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
    FormInputDropdownComponent
  ]
})
export class SharedModule { }