/***
 * App Routing file.
 *
 * All application routes are here with Guards.
 */

import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './core-module/guards/index';
import {AuthModule} from './auth-module/auth.module';

import {
  HomeComponent,
  CreatePoolComponent
} from './components';

import {
  LoginComponent,
  SignUpComponent,
  PasswordResetComponent,
  EmailVerificationComponent
} from './auth-module';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
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
    path: 'create-pool',
    component: CreatePoolComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
