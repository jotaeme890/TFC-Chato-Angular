import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
  standalone: true
})
export class ShortenTextPipe implements PipeTransform {

  /**
  * The function "transform" takes a string value and limits its length to a specified number, adding
  * ellipsis if necessary.
  * 
  * @param value The `value` parameter is a string that represents the input value that will be
  * transformed.
  * @param limit The `limit` parameter specifies the maximum length of the string that will be
  * returned by the `transform` function. If the length of the `value` string is greater than the
  * `limit`, the function will truncate the string to the `limit` length and append a period ('.') at
  * the end
  * @return The function `transform` takes a string `value` and an optional number `limit` with a
  * default value of 15. It checks if the length of the `value` is greater than the `limit`. If it is,
  * it returns a substring of the `value` up to the `limit` followed by a period. If the length of the
  * `value` is not greater than the
  */
  transform(value: string, limit: number = 15): string {
    return value.length > limit ? value.substring(0, limit) + '.' : value;
  }

}
