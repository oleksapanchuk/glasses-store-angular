import {FormControl, ValidationErrors} from "@angular/forms";

export class InputFieldValidator {

  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {

    // check if string contains whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {

      // invalid, return error object
      return {'notOnlyWhitespace': true};
    }

    // valid, return null
    return null;
  }
}
