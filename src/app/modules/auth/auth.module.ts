import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionsComponent } from './components/actions/actions.component';
import { SignInComponent } from './components/actions/sign-in/sign-in.component';
import { SignUpComponent } from './components/actions/sign-up/sign-up.component';
import { SecurityDetailsComponent } from './components/actions/sign-up/form-steps/security-details/security-details.component';
import { PersonalInfoComponent } from './components/actions/sign-up/form-steps/personal-info/personal-info.component';
import { ReviewAndSubmitComponent } from './components/actions/sign-up/form-steps/review-and-submit/review-and-submit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ActionsComponent,
        SignInComponent,
        SignUpComponent,
        SecurityDetailsComponent,
        PersonalInfoComponent,
        ReviewAndSubmitComponent,
    ],
    providers: []
})
export class AuthModule { }
