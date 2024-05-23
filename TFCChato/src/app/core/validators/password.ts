import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
export class PasswordValidation {
  /**
   * Validates password according to a specified pattern.
   * @param {string} controlName - The name of the control to validate.
   * @returns {ValidatorFn} Validator function for password validation.
   */
  public static passwordProto(controlName: string = ''): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let password = '';
      if (control instanceof FormControl) password = control?.value;
      else password = control.get(controlName)?.value;
      if (
        password &&
        !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ) {
        return { passwordProto: true };
      } else {
        return null;
      }
    };
  }

  /**
   * Validates if password and confirm password match.
   * @param {string} passwordControlName - The name of the password control.
   * @param {string} confirmControlName - The name of the confirm password control.
   * @returns {ValidatorFn} Validator function for password match validation.
   */
  public static passwordMatch(
    passwordControlName: string,
    confirmControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordControlName)?.value;
      const confirmPassword = control.get(confirmControlName)?.value;

      if (password != confirmPassword) {
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordMatch: true,
          });
        } else {
          errors = {
            passwordMatch: true,
          };
        }
        return errors;
      } else {
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if (errors['passwordMatch']) delete errors['passwordMatch'];
        }
        return control.errors;
      }
    };
  }
}
