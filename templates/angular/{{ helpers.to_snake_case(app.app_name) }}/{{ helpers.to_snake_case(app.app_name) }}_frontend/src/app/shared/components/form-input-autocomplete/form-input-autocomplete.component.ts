import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { EMPTY, Observable, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-form-input-autocomplete',
  templateUrl: './form-input-autocomplete.component.html',
  styleUrls: ['./form-input-autocomplete.component.scss']
})
export class FormInputAutocompleteComponent implements OnInit{

  results: any[] = []
  autocomplete_control = new FormControl();
  _control?: FormControl

  @Input()
  label?: string
  @Input()
  searchFunction = (search: string): Observable<any[]> => EMPTY
  @Input()
  displayFn = (item: any) => item
  @Input()
  valueFn = (item: any) => item.id
  @Input()
  set control(control: AbstractControl) {
    this._control = control as FormControl
    if (!!control?.hasValidator(Validators.required)) {
      this.autocomplete_control.addValidators([Validators.required])
    }
  }

  ngOnInit(): void {
    this.autocomplete_control.valueChanges.pipe(
      debounceTime(500),
      tap(search => this.search(search))
    ).subscribe()
  }

  select(value: any): void {
    const selected = this.results.find(val => this.displayFn(val) === this.control.value)
    console.log('id:', this.valueFn(selected))
  }

  public search(search: string): void {
    console.log('search:', search)
    this.searchFunction(search).subscribe(values => {
      this.results.splice(0, this.results.length)
      values.forEach(value => this.results.push(value))
    })
  }
}
