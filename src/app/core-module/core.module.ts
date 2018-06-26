import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ApiService,
  AlertService,
  UtilService
} from '../services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ApiService,
    AlertService,
    UtilService
  ],
  providers: [
    ApiService,
    AlertService,
    UtilService
  ]
})
export class CoreModule {
}
