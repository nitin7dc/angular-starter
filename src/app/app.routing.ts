/***
 * App Routing file.
 *
 * All application routes are here with Guards.
 */

import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/index';

import {

  HomeComponent,
} from './components';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
