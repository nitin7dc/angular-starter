``/***
 * App Routing file.
 *
 * All application routes are here with Guards.
 */

import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './core-module/guards/index';
import {AuthModule} from './auth-module/auth.module';

import {
  HomeComponent
} from './feature-module';

import {
  LoginComponent,
  SignUpComponent,
  PasswordResetComponent,
  EmailVerificationComponent,
  TwoStepVerificationComponent,
  TwoStepSetupComponent,
  ChangePasswordComponent
} from './auth-module';

import {UserService} from './core-module/services';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/two-step',
    component: TwoStepVerificationComponent
  },
  {
    path: 'auth/sign-up',
    component: SignUpComponent
  },
  {
    path: 'auth/password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'auth/email-verification',
    component: EmailVerificationComponent
  },
  {
    path: 'auth/two-step-verification',
    component: TwoStepVerificationComponent
  },
  {
    path: 'settings/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserService
    }
  },
  {
    path: 'settings/two-step-verification',
    component: TwoStepSetupComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserService
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserService
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
