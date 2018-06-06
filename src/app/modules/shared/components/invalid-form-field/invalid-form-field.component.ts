import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-invalid-form-field',
    templateUrl: './invalid-form-field.component.html',
    styleUrls: ['./invalid-form-field.component.css']
})
export class InvalidFormFieldComponent implements OnInit, OnChanges {

    @Input()
    public Errors: Object | any
    public DisplayErrorMsg: string

    constructor() { }

    ngOnInit() {
        this.resolveErrorMsg();
    }

    ngOnChanges(changes: SimpleChange | any) {
        // console.log(changes);
        this.resolveErrorMsg();
    }

    resolveErrorMsg() {
        // console.log(this.Errors)
        if (this.Errors) {
            if (this.Errors.hasOwnProperty('required')) this.DisplayErrorMsg = 'Required field'
            else if (this.Errors.hasOwnProperty('minlength')) this.DisplayErrorMsg = `Value too short - min is ${this.Errors.minlength.requiredLength}`
            else if (this.Errors.hasOwnProperty('maxlength')) this.DisplayErrorMsg = `Value too long - max is ${this.Errors.maxlength.requiredLength} `
            else if (this.Errors.hasOwnProperty('email')) this.DisplayErrorMsg = 'Invalid email'
            else if (this.Errors.hasOwnProperty('pattern')) this.DisplayErrorMsg = 'Invalid format / characters'
            else if (this.Errors.hasOwnProperty('max')) this.DisplayErrorMsg = `Value to large - only ${this.Errors.max.max} available`
            else if (this.Errors.hasOwnProperty('unavailableDate')) this.DisplayErrorMsg = `Date is fully booked`
            else if (this.Errors.hasOwnProperty('pasDate')) this.DisplayErrorMsg = `Date has passed`
            else {
                let msg: string = '';
                for (let key in this.Errors) {
                    msg += this.Errors[key] + ', '
                }
                if (msg.charAt(msg.length-2) == ',') msg = msg.slice(0, msg.length-2)
                this.DisplayErrorMsg = msg;
            }
        }
    }
}