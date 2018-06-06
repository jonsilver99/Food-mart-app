import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appIllegalCharsFilter]'
})
export class IllegalCharsFilterDirective implements OnInit {

    private IllegalChars: RegExp = new RegExp(/[|*&;,$%"'`=/\\\\<>[\]\\(){}+]/g);

    constructor(private elRef: ElementRef, private control: NgControl) { }

    ngOnInit() {
        // this.control.control.valueChanges.subscribe(
        //     val => {
        //         if (this.isIllegal(val)){
        //             this.control.control.patchValue(this.replaceIllegal(val, ''))
        //         }
        //     }
        // )
    }

    @HostListener('keydown', ['$event'])
    filter(event: any) {
        if (this.isIllegal(event.key)) {
            event.preventDefault();
            this.control.control.patchValue(this.replaceIllegal(this.control.control.value, ''))
        }
        return
    }

    isIllegal(input: string | any) {
        return this.IllegalChars.test(input)
    }

    replaceIllegal(key: string, replaceValue: any) {
        return key.replace(this.IllegalChars, '');
    }
}