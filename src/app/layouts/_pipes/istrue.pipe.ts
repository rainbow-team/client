import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isTrue'
})
export class IsTruePipe implements PipeTransform {

    transform(value: any): any {
        let result: string = '';
        if (value == 1) {
            result = '是';
        }
        else {
            result = '否';
        }
        return result;
    }

}
