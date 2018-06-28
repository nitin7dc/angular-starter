import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ApiService,
  AlertService,
  UtilService,
  AuthService,
  UserService
} from './services';

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
    UserService
  ]
})
export class CoreModule {
}
