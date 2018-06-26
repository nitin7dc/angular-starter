import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import {UserService} from './user.service';
import {AuthService} from './auth.service';

import {SharedModule} from '../shared-module';


@NgModule({
  declarations: [
    EmailVerificationComponent,
    LoginComponent,
    PasswordResetComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EmailVerificationComponent,
    LoginComponent,
    PasswordResetComponent,
    SignUpComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})

export class AuthModule {
}

