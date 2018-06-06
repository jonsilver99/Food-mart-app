import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { Order } from '../../../../../models/interfaces';
import { NotificationsService } from '../../../../core/services/notifications.service';
import { CustomFormValidatorsService } from '../../../../shared/services/custom-form-validators.service';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

    @Input() public OrderForm: FormGroup;

    @Output() public OrderPlaced: EventEmitter<Order> = new EventEmitter<Order>();

    constructor(
        private NotificationsService: NotificationsService,
        private CustomValidators: CustomFormValidatorsService        
    ) { }

    ngOnInit() { }

    // order Form methods
    getFieldValue(fieldName: string) {
        return this.OrderForm.get(fieldName).value
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.OrderForm.get(`${fieldName}`).touched && this.OrderForm.get(`${fieldName}`).invalid
    }

    getFieldErrors(fieldName: string): boolean | any {
        return this.OrderForm.get(`${fieldName}`).errors
    }

    onSelectedPaymentType(value: string) {
        if (!value) return
        let paymentFields = (this.OrderForm.get('Payment') as FormArray).controls
        for (let fieldName in paymentFields) {
            if (fieldName != 'Type') {
                paymentFields[fieldName].clearValidators()
                paymentFields[fieldName].clearAsyncValidators()
                paymentFields[fieldName].reset()
            }
        }
        if (value == 'Credit') {
            paymentFields['CardBrand'].setValidators(Validators.required)
            paymentFields['CardNumber'].setValidators([
                Validators.required,
                Validators.maxLength(19),
                this.CustomValidators.assertCreditCardPattern
            ])
        }
        else if (value == 'Paypal' || value == 'Bitcoin') {
            paymentFields['CredentialEmail'].setValidators(Validators.required)
            paymentFields['CredentialPassword'].setValidators(Validators.required)

        }
    }

    onOrderPlaced() {
        if (this.OrderForm.invalid) {
            return this.NotificationsService.notifyClient({
                Type: 'alert', Message: 'Invalid form inputs', Timeout: 4000
            })
        }
        this.OrderPlaced.emit(this.OrderForm.value)
    }
}