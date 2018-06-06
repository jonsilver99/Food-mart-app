import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationsService } from '../../../../core/services/notifications.service';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css', '../actions.component.css']
})
export class SignInComponent implements OnInit {

    public SignInForm: FormGroup;
    public IsPending: boolean = false;

    constructor(
        private Router: Router,
        private FB: FormBuilder,
        private AuthService: AuthService,
        private NotificationsService: NotificationsService,
        private Route?: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.initForm();
        this.Route.queryParams.subscribe((quryPrms) => {
            if (quryPrms && quryPrms.email) {
                this.SignInForm.patchValue({ 'Email': quryPrms.email })
            }
        });
    }

    initForm() {
        this.SignInForm = this.FB.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required]],
        })
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.SignInForm.get(fieldName).touched && this.SignInForm.get(fieldName).invalid
    }

    onSubmit() {
        if (this.IsPending) return false

        if (this.SignInForm.valid) {
            this.IsPending = true;
            this.AuthService.signIn(this.SignInForm.value).subscribe(
                result => {
                    console.log(result)
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

    navigateToSignUpForm(event) {
        event.preventDefault();
        this.Router.navigate(['/auth/actions/signup']);
    }
}