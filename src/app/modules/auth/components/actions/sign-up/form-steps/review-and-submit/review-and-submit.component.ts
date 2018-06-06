import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-review-and-submit',
    templateUrl: './review-and-submit.component.html',
    styleUrls: ['./review-and-submit.component.css', '../../sign-up.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {

    @Input()
    public Parent: FormGroup;
    public AllFormsControls: FormGroup | any;
    public ObjectKeys = Object.keys;

    constructor() { }

    ngOnInit() {
        let SecurityDetails: any = this.Parent.get('securityDetails');
        let personalInfo: any = this.Parent.get('personalInfo');
        this.AllFormsControls = Object.assign({}, SecurityDetails.controls, personalInfo.controls)
        delete this.AllFormsControls.PassConfirm
        console.log('All form controls', this.AllFormsControls);
    }


}
