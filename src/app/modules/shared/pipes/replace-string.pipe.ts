import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceString'
})
export class ReplaceStringPipe implements PipeTransform {

    transform(value: string, string?: RegExp | string, replaceValue?: string): any {
        if (!string) string = value;
        if (!replaceValue) replaceValue = '';
        value = value.replace(string, replaceValue);
        return value
    }

}
