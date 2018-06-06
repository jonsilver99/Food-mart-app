import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModulesGuard } from './modules/core/services/modules.guard';

const appCoreRoutes: Routes = [
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule', canLoad: [ModulesGuard] },
    { path: 'store', loadChildren: './modules/store/store.module#StoreModule', canLoad: [ModulesGuard] },
    { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canLoad: [ModulesGuard] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appCoreRoutes, { enableTracing: false }),
    ],
    exports: [
        RouterModule // by exporting routermodule from here - I dont need to import it in my app.module
    ],
    declarations: []
})
export class AppRoutingModule { }
