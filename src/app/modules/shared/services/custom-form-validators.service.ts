import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CustomFormValidatorsService {

    public debounce: any;

    constructor(private HttpReqs: HttpClient) { }

    checkForNums(control: AbstractControl): any {
        let nums = new RegExp(/\d/g);
        return (nums.test(control.value)) ? null : { 'NumbersMissing': 'Must contain at least 1 digit' }
    }

    checkPasswordMatch(FormGroup: FormGroup): any {
        if (FormGroup.get('Password').value != FormGroup.get('PassConfirm').value) {
            FormGroup.get('PassConfirm').setErrors({ 'passwordMatchErr': 'Password fields dont match' })
        } else {
            return null
        }
    }

    // this checks the length of the id field
    checkNumberLength(control: AbstractControl) {
        if (control.value) {
            let numeralValue = control.value.toString()
            if (numeralValue.length < 3) return { 'minNumLength': 'number value to short' }
            if (numeralValue.length > 10) return { 'maxNumLength': 'number value to long' }
        }
        return null
    }

    checkCartIsNotEmpty(FormGroup: FormGroup) {
        if (FormGroup.get('ItemsInCart').value.length < 1) {
            FormGroup.get('ItemsInCart').setErrors({ 'EmptyCartErr': 'No items in cart' })
        } else {
            return null
        }
    }

    debounceAsyncValidator(control: AbstractControl) {
        return new Promise((resolve, reject) => {
            const debounce = () => {
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    resolve(this.checkUniqueValueOnServer(control))
                }, 2000)
            }
            return debounce()
        })
    }

    checkUniqueValueOnServer(control: AbstractControl): any {
        let collectionName;
        let fieldName;
        let fieldValue = control.value;
        // resolve field name
        let controls = control.parent.controls;
        for (let controlName in controls) {
            if (controls[controlName] == control) {
                fieldName = controlName;
                break;
            }
        }
        // resolve collection name
        if (['Identification', 'Email', 'Phone'].includes(fieldName)) collectionName = 'User'
        else if (['ProductName', '', ''].includes(fieldName)) collectionName = 'Product'

        let params = { 'fieldName': `${fieldName}`, 'fieldValue': `${fieldValue}`, dontCache: 'true' }
        return this.HttpReqs.get(`${environment.CheckIfUniqueValue}/${collectionName}`, { params: params })
            .toPromise()
            .then((response: any) => {
                return (response.message == 'Unique') ? null : { 'uniqueValue': `${fieldName} already exists` }
            })
            .catch(err => { throw err })
    }

    checkValidDeliveryDate(unavailableDates: Date[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            let selectedDate = control.value;
            if (unavailableDates.includes(selectedDate)) {
                return { 'unavailableDate': true };
            }
            if (this.isAPastDate(selectedDate)) {
                return { 'pasDate': true };
            }
            return null;
        };
    }

    isAPastDate(date) {
        const today = new Date(Date.now())
        today.setHours(0, 0, 0, 0)
        date = new Date(date)
        date.setHours(0, 0, 0, 0)

        if (date < today) return true
        else return false
    }

    assertCreditCardPattern(control: AbstractControl) {
        let numsonly = new RegExp(/^[\d\s]+$/);
        if (!control.value || control.value.toString().length != 19) return { 'length': 'value must be 16 digits' }
        if (!numsonly.test(control.value)) return { 'pattern': true }
        return null
    }


}