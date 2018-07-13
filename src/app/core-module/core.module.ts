import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {
  ApiService,
  AlertService,
  UtilService,
  AuthService,
  UserService,
  Web3Service,
  AuthInterceptorService
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
    AccountReadyGuard,
    Web3Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
}
