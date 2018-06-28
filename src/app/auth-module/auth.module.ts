import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import {SharedModule} from '../shared-module';
import {CoreModule} from '../core-module';

import {AuthRoutes} from './auth.routing';


@NgModule({
  declarations: [
    EmailVerificationComponent,
    LoginComponent,
    PasswordResetComponent,
    SignUpComponent
  ],
  imports: [
    AuthRoutes,
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    EmailVerificationComponent,
    LoginComponent,
    PasswordResetComponent,
    SignUpComponent
  ],
  providers: []
})

export class AuthModule {
}

