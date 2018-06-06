import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { SignInComponent } from './components/actions/sign-in/sign-in.component';
import { SignUpComponent } from './components/actions/sign-up/sign-up.component';
import { RouteAuthGuard } from '../core/services/route-auth.guard';

const AuthRoutes: Routes = [
    {
        path: 'actions', component: ActionsComponent, canActivateChild:[RouteAuthGuard], children: [
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', redirectTo: 'signin', pathMatch: 'full' },
            { path: '**', redirectTo: 'signin', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: 'actions', pathMatch: 'full' },
    { path: '**', redirectTo: 'actions', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forChild(AuthRoutes),
    ],
    exports: [
        RouterModule // by exporting routermodule from here - I dont need to import it in my app.module
    ],
    declarations: []
})
export class AuthRoutingModule { }
