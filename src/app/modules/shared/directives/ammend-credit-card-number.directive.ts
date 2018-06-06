import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appAmmendCreditCardNumber]'
})
export class AmmendCreditCardNumberDirective {

    constructor(private elRef: ElementRef, private control: NgControl) { }

    @HostListener('input', ['$event'])
    onInput(event: KeyboardEvent) {
        let input = event.target as HTMLInputElement

        let trimmedValue = input.value.replace(/\s+/g, '')
        if (trimmedValue.length > 16) trimmedValue = trimmedValue.substr(0, 16);

        let numbers = []
        for (let i = 0; i < trimmedValue.length; i += 4) {
            numbers.push(trimmedValue.substr(i, 4))
        }

        input.value = numbers.join(' ')

        this.control.control.patchValue(input.value);
    }
}