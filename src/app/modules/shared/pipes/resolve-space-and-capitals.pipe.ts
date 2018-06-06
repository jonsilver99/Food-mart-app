import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'resolveSpaceAndCapitals'
})
export class ResolveSpaceAndCapitalsPipe implements PipeTransform {

    transform(value: string, args?: any): any {
        // 1 - Add space before each capital letter, since variable names use camelCase to mark begining of a new word
        value = value.replace(/([a-z])([A-Z])/g, '$1 $2');
        // value = value.replace(/([A-Z])([A-Z])/g, '$1 $2');
        
        // 2 - Capitalize first letter and lower case the rest
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value;
    }

}
