import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../../models/interfaces';
import { User, ApiResponse } from '../../../models/interfaces';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthService {

    public AuthState: AuthState = { IsSignedIn: false, Token: null, User: null }

    constructor(
        private HttpReqs: HttpClient,
        private Router: Router,
    ) { }

    signUp(userData: User) {
        if (this.AuthState.IsSignedIn) {
            return Observable.of("Already signed-in - signup request aborted");
        } else {
            return this.HttpReqs.post(environment.SignUpUrl, userData, { reportProgress: true })
                .map((result: any) => {
                    return result;
                })
        }
    }

    signIn(credentials: { Email: string, Password: string }) {
        if (this.AuthState.IsSignedIn) {
            return Observable.of("Already signed-in - signin request aborted");
        } else {
            return this.HttpReqs.post(environment.SignInUrl, credentials, { reportProgress: true })
                .map((res: ApiResponse) => {
                    const newAuthState = res.data;
                    return this.commenceSignIn(newAuthState);
                })
        }
    }

    commenceSignIn(AuthState: AuthState) {
        this.AuthState = AuthState;
        localStorage.setItem('Online-Food-Mart', JSON.stringify(this.AuthState));
        if (this.AuthState.User.Role == 'customer') this.Router.navigate(['/store']);
        if (this.AuthState.User.Role == 'admin') this.Router.navigate(['/admin']);
        return `Signed-in as user: ${this.AuthState.User.FirstName} ${this.AuthState.User.LastName}`;
    }

    verifyToken(): Observable<any> {
        // whenever navigation between local routes occures - this func checks the validity of the auth token.
        // this re-assures that expired/invalid sessions will be terminated 
        const header = new HttpHeaders({ 'authorization': this.AuthState.Token });
        return this.HttpReqs.get(environment.VerifyTokenUrl, { headers: header, params: { dontCache: 'true' } })
    }

    signOut() {
        this.AuthState = { IsSignedIn: false, Token: null, User: null }
        localStorage.removeItem('Online-Food-Mart');
        this.Router.navigateByUrl('/');
        // refresh browser to reset all data services
        window.location.reload()

    }

    checkIfPreviousSessionExists(): void {
        // Check if previous session exists in local storage
        let previousSession: AuthState = JSON.parse(localStorage.getItem('Online-Food-Mart'));
        if (previousSession) {
            this.commenceSignIn(previousSession);
        }
    }

    get User() {
        return this.AuthState.User
    }

}
