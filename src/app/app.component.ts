import {Component, OnDestroy} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {Subscription} from 'rxjs';

import {ApiService, AuthService} from './core-module/services';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

  authSubscription: Subscription;
  loading = true;

  constructor(private apiService: ApiService,
              private title: Title,
              private router: Router,
              private authService: AuthService) {

    this.title.setTitle(environment.appName);
    this.listenToRouterEvents();
    this.listenToAuthEvent();

  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  /**
   * Listen for auth token expired event.
   */
  listenToAuthEvent() {
    this.authSubscription = this.apiService.authenticationFailEvent
      .subscribe(() => {
        this.authService.signOut();
      });
  }


  /**
   * Router Events.
   */
  listenToRouterEvents(): void {

    this.router.events.subscribe((routerEvent) => {

      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.loading = false;
      }

    });

  }

}

