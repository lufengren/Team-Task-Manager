import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { NoWhitespaceValidator } from '../share/validators/no-whitespace.validator';

@Directive({
  selector: '[appNoSpaces]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

