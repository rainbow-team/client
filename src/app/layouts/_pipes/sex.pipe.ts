import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sex'
})
export class SexPipe implements PipeTransform {

    transform(value: any): any {
        let result: string = '';
        if (value == 1) {
            result = '男';
        }
        else {
            result = '女';
        }
        return result;
    }

}
