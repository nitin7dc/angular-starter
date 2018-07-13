import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

/********************************************
 * Other app modules.
 ********************************************/

import {SharedModule} from '../shared-module';
import {CoreModule} from '../core-module';


/********************************************
 * Components.
 ********************************************/

import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {TwoStepVerificationComponent} from './two-step-verification/two-step-verification.component';
import {TwoStepSetupComponent} from './two-step-setup/two-step-setup.component';

@NgModule({
  declarations: [
    EmailVerificationComponent,
    LoginComponent,
    PasswordResetComponent,
    SignUpComponent,
    ChangePasswordComponent,
    TwoStepVerificationComponent,
    TwoStepSetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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

