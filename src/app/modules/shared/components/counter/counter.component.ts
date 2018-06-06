import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterComponent),
    multi: true
};

@Component({
    selector: 'app-counter',
    providers: [COUNTER_CONTROL_ACCESSOR],
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements ControlValueAccessor {

    @Input()
    public step: number = 1;
    @Input()
    public min: number = 1;
    @Input()
    public max: number = 100;
    public value: number = 1;

    private onTouch: Function;
    private onModelChange: Function;

    constructor() { }    

    writeValue(value) {
        this.value = value || 0;
    }
    
    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    increment() {
        if (this.value < this.max) {
            this.value = this.value + this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }
    decrement() {
        if (this.value > this.min) {
            this.value = this.value - this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }
}