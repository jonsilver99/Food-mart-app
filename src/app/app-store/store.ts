import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { InitialAppState } from "./default-store-state";
import { AppState } from "../models/interfaces";

export class Store {

    private InitialState: AppState = InitialAppState
    private Subject: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(this.InitialState)
    private Store = this.Subject.asObservable().distinctUntilChanged();

    get currentState() {
        return this.Subject.value
    }

    select<T>(propName: string[]): Observable<T> {
        return this.Store.pluck(...propName)
    }

    set(propName: string, state: any) {
        this.Subject.next({
            ...this.currentState, [propName]: state
        })
    }

    setDeep(propName: string, subKey: string, state: any) {
        this.Subject.next({
            ...this.currentState,
            [propName]: {
                ...this.currentState[propName],
                [subKey]: state
            }
        })
    }

    log() {
        console.log('Current app state', this.currentState);
    }
}