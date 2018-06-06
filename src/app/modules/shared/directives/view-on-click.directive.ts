import { Directive, Input, HostListener } from '@angular/core';
import { Product } from '../../../models/interfaces';

@Directive({
    selector: '[appViewOnClick]'
})
export class ViewOnClickDirective {

    @Input()
    public View:Product; 

    constructor() { }

    @HostListener('click')
    log(){
        // console.log('clicked product from directive', this.View);
    }
}
