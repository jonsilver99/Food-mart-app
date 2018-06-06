import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appAmmendPhoneNumber]'
})
export class AmmendPhoneNumberDirective {

    constructor(private elRef: ElementRef, private control:NgControl) { }

    @HostListener('input', ['$event'])
    onInput(event: any) {
        let trimmedValue = event.target.value.replace(/\s+/g, '')
        if (trimmedValue.length > 11) trimmedValue = trimmedValue.substr(0, 11);

        let ammended: any[] = trimmedValue.split('');
        if (ammended.length >= 3 && !ammended.includes('-')) {
            ammended.splice(3, 0, '-');
        }
        this.control.control.patchValue(ammended.join(''));
    }
    // ammendPhoneNumberValue(value: string | any) {
    //     let trimmedValue = value.replace(/\s+/g, '')
    //     if (trimmedValue.length > 11) trimmedValue = trimmedValue.substr(0, 11);

    //     let ammended: any[] = trimmedValue.split('');
    //     if (ammended.length >= 3 && !ammended.includes('-')) {
    //         ammended.splice(3, 0, '-');
    //     }
    //     this.OrderForm.get('ShippingDetails.Phone').patchValue(ammended.join(''));
    // }
}