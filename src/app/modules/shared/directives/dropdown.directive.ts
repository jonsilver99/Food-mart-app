import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(public eleRef: ElementRef, public renderer2: Renderer2) { }

    @HostListener('click') dropdown() {
        this.renderer2.addClass(this.eleRef.nativeElement, 'show')
    }

    @HostListener('mouseleave') packup() {
        this.renderer2.removeClass(this.eleRef.nativeElement, 'show')
    }

}
