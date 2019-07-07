import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recordtime'
})
export class RecordtimePipe implements PipeTransform {

    transform(value: any, args?: any): any {

        var dateee = new Date(value).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');

        var result = date.split(" ")[0];
        return result;
    }

}