import { Component, OnInit, Input, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-security-details',
    templateUrl: './security-details.component.html',
    styleUrls: ['./security-details.component.css', '../../sign-up.component.css']
})
export class SecurityDetailsComponent implements OnInit {

    @Input()
    public Parent: FormGroup

    constructor() { }

    ngOnInit() { }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.Parent.get(`securityDetails.${fieldName}`).touched && this.Parent.get(`securityDetails.${fieldName}`).invalid
    }
}