import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal',
  standalone: true
})
export class OrdinalPipe implements PipeTransform {

  transform(value: unknown): string {
    const num = Number(value);
    if (isNaN(num)) return String(value);

    const absNum = Math.abs(num);
    const lastDigit = absNum % 10;
    const lastTwoDigits = absNum % 100;

    let suffix = 'th';
    if (lastTwoDigits < 11 || lastTwoDigits > 13) {
      if (lastDigit === 1) suffix = 'st';
      else if (lastDigit === 2) suffix = 'nd';
      else if (lastDigit === 3) suffix = 'rd';
    }

    return `${num}${suffix}`;
  }
}
