import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class EmailValidation {
    
    /**
    * Validates an email control.
    * @param {string} controlName - The name of the control to validate.
    * @returns {ValidatorFn} Validator function for email validation.
    */
    public static email(controlName:string=''): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let email = '';
            if(control instanceof FormControl)
                email = control?.value;
            else
                email = control.get(controlName)?.value;
            if(email && !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                return { 'email': true};
            }
            else{
                return null;
            }  
        }
    }
}