import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    if (isNaN(totalSeconds)) {
      return '0:00.00';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const hundredths = Math.floor(
      (totalSeconds - Math.floor(totalSeconds)) * 100
    );
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${
      hundredths < 10 ? '0' : ''
    }${hundredths}`;
  }
}
