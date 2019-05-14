import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, dateFormat?: string): string {
    let mom = Moment(value);
    return mom.isValid() ? mom.format(dateFormat || 'YYYY-MM-DD') : '';
  }

}
