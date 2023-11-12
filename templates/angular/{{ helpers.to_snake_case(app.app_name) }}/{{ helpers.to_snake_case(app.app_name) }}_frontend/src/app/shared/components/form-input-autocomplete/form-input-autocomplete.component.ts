import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { EMPTY, Observable, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-form-input-autocomplete',
  templateUrl: './form-input-autocomplete.component.html',
  styleUrls: ['./form-input-autocomplete.component.scss']
})
export class FormInputAutocompleteComponent implements OnInit{

  results: any[] = [];
  autocomplete_control = new FormControl();
  _control?: FormControl;
  required = true;

  @Input()
  label?: string
  @Input()
  searchFunction = (search: string): Observable<any[]> => EMPTY
  @Input()
  displayFn = (item: any) => item
  @Input()
  valueFn = (item: any) => item.id
  @Input()
  set control(control: AbstractControl | null) {
    this._control = control as FormControl
    if (!!control?.hasValidator(Validators.required)) {
      this.required = true;
      this.autocomplete_control.addValidators([Validators.required])
    } else {
      this.required = false;
    }
  }

  ngOnInit(): void {
    this.autocomplete_control.valueChanges.pipe(
      debounceTime(500),
      tap(search => this.search(search))
    ).subscribe()

    if (this._control?.value) {
      const id = this.valueFn(this._control?.value)
      const display = this.displayFn(this._control?.value)
      this.autocomplete_control.setValue(display, {emitEvent: false})
      this._control.setValue(id, {emitEvent: false})
    }
    this.search('');
  }

  select(): void {
    const selected = this.results.find(val => this.displayFn(val) === this.autocomplete_control?.value)
    if (selected) {
      this._control?.setValue(this.valueFn(selected));
    } else {
      this._control?.setValue(null);
    }
  }

  search(search: string): void {
    this.searchFunction(search).subscribe(values => {
      this.results.splice(0, this.results.length)
      values.forEach(value => this.results.push(value))
    })
  }
}
