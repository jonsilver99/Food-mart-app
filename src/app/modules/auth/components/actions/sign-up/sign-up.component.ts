import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpAnimations } from './animations'
import { CustomFormValidatorsService } from '../../../../shared/services/custom-form-validators.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../../models/interfaces';
import { NotificationsService } from '../../../../core/services/notifications.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css', '../actions.component.css'],
    animations: SignUpAnimations
})
export class SignUpComponent implements OnInit {

    public SignUpForm: FormGroup
    public IsPending: boolean = false;

    public Progress = {
        steps: { step1: true, step2: false, step3: false },
        indicator: { step1: true, step2: false, step3: false }
    }
    public StepDirection: 'next' | 'back' = 'next'

    constructor(
        private Router: Router,
        private FB: FormBuilder,
        private CustomValidators: CustomFormValidatorsService,
        private AuthService: AuthService,
        private NotificationsService: NotificationsService,
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.SignUpForm = this.FB.group({
            securityDetails: this.FB.group({
                Identification: ['', [Validators.required, this.CustomValidators.checkNumberLength], [this.checkUniqueValueOnServer.bind(this)]],
                Email: ['', [Validators.required, Validators.email], [this.checkUniqueValueOnServer.bind(this)]],
                Password: ['', [Validators.required, this.CustomValidators.checkForNums]],
                PassConfirm: ['', [Validators.required]],
            }, { validator: this.CustomValidators.checkPasswordMatch }),
            personalInfo: this.FB.group({
                FirstName: ['', [Validators.required, Validators.maxLength(15)]],
                LastName: ['', [Validators.required, Validators.maxLength(20)]],
                Phone: ['', [Validators.required, Validators.maxLength(11)], [this.checkUniqueValueOnServer.bind(this)]],
                City: ['', [Validators.required]],
                Street: ['', [Validators.required, Validators.maxLength(35), this.CustomValidators.checkForNums]],
            })
        })
    }

    checkUniqueValueOnServer(control: AbstractControl) {
        return this.CustomValidators.checkUniqueValueOnServer(control);
        // return this.CustomValidators.debounceAsyncValidator(control)
    }

    formStepValid(formStep: 'securityDetails' | 'personalInfo') {
        console.log(this.SignUpForm.get(formStep))
        return this.SignUpForm.get(formStep).valid
    }

    changeFormStep(event) {
        // 1 - Animate previous step out by setting all steps to false
        // 2 - After previous step is removed, animate next step in
        // 3 - After both animations finish - update the steps indicator to show current progress state
        let newProgressState = { step1: false, step2: false, step3: false, }
        let paneData = event.target.dataset;
        let switchTo = paneData.switch;
        this.StepDirection = paneData.direction
        setTimeout(() => {
            this.Progress.steps = newProgressState;
            setTimeout(() => {
                newProgressState[switchTo] = true;
                this.Progress.indicator = newProgressState;
            }, 200);
        }, 0);
    }

    onSubmit() {
        if (this.IsPending) return false

        if (this.SignUpForm.valid) {
            this.IsPending = true;
            let userData: User = Object.assign({}, this.SignUpForm.get('securityDetails').value, this.SignUpForm.get('personalInfo').value)
            delete userData.PassConfirm;

            this.AuthService.signUp(userData).subscribe(
                result => {
                    if (result.success) {
                        this.navigateToSignInForm(null, userData.Email)
                        this.NotificationsService.notifyClient({ Type: 'success', Message: result.message })
                    }
                    setTimeout(() => this.IsPending = false, 1000);
                },
                err => this.IsPending = false,
                () => setTimeout(() => this.IsPending = false, 1000)
            )

        } else {
            return this.NotificationsService.notifyClient({
                Type: 'alert', Message: 'Invalid form inputs', Timeout: 4000
            })
        }
    }

    navigateToSignInForm(event?, email?) {
        if (event) event.preventDefault();
        if (!email) email = '';
        this.Router.navigate(['/auth/actions/signin'], { queryParams: { 'email': email } });
    }
}