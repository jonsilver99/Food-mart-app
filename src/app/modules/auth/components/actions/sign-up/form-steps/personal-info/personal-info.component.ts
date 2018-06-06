import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.css', '../../sign-up.component.css']
})
export class PersonalInfoComponent implements OnInit {

    @Input()
    public Parent: FormGroup

    constructor() { }

    ngOnInit() {
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.Parent.get(`personalInfo.${fieldName}`).touched && this.Parent.get(`personalInfo.${fieldName}`).invalid
    }

}
