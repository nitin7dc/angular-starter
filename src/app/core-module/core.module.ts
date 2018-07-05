import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ApiService,
  AlertService,
  UtilService,
  AuthService,
  UserService
} from './services';

import {
  AuthGuard,
  AccountReadyGuard
} from './guards';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    ApiService,
    AlertService,
    UtilService,
    AuthService,
    UserService,
    AuthGuard,
    AccountReadyGuard
  ]
})
export class CoreModule {
}
