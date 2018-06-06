// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { ErrorsHandlerService } from './modules/core/services/errors-handler.service';
import { Store } from './app-store/store';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
    ],
    providers: [
        Store,
        {
            provide: ErrorHandler,
            useClass: ErrorsHandlerService,
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
