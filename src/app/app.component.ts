import {Component, OnDestroy} from '@angular/core';
import {ApiService} from './core-module/services';
import {AuthService} from './auth-module/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

  authSubscription: Subscription;

  constructor(private apiService: ApiService,
              private router: Router,
              private authService: AuthService) {

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
        this.router.navigateByUrl('/login');
      });
  }

}

