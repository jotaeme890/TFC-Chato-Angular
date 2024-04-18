import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeInitial'
})
export class CapitalizeInitialPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + '.';
  }

}