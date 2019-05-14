import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'textOmit'
})
export class TextOmitPipe implements PipeTransform {

  transform(value: string, showLength?: string): string {
    let textLength = parseFloat(showLength);
    return _.truncate(value, {
      length: isNaN(textLength) ? 20 : textLength
    });
  }

}
