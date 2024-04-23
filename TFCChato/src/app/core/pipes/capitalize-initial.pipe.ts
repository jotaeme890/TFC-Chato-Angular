import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeInitial'
})
export class CapitalizeInitialPipe implements PipeTransform {

  /**
  * The function takes a string as input, capitalizes the first letter, and adds a period at the end.
  * 
  * @param value The `value` parameter in the `transform` function is a string or undefined. If the
  * `value` is undefined or falsy, the function returns an empty string. Otherwise, it capitalizes the
  * first character of the string and appends a period at the end before returning the transformed
  * string.
  * @return An empty string is being returned if the `value` is falsy. Otherwise, the first character
  * of the `value` is capitalized and followed by a period.
  */
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + '.';
  }

}