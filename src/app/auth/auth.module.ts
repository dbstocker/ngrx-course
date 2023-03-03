/* angular imports */
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

/* material imports */
import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

/* ngrx imports */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* project imports */
import {LoginComponent} from './login/login.component';
import {AuthService} from "./auth.service";
import * as fromAuth from './reducers';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        StoreModule.forFeature('auth', fromAuth.authReducer),

    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService
            ]
        }
    }
}
