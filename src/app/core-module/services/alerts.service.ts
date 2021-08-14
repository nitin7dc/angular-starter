import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable()
export class AlertService {

  private keepAfterNavigationChange = false;
  private readonly config;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) {

    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.extraClasses = ['custom-snack-bar'];

    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        }
      }
    });
  }

  success(message?: string, keepAfterNavigationChange = false) {

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    message = message ? 'Success : ' + message : 'Success : Changes saved.';
    this.snackBar.open(message, 'OK', this.config);

  }

  error(response?: any, keepAfterNavigationChange = false) {

    let message = 'Please try again.                                '; // extra spaces for width :D
    if (response && response.error && response.error.message) {
      message = response.error.message;
    }

    this.snackBar.open(message, 'OK', this.config);

  }

  info(message?: string, keepAfterNavigationChange = false) {

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.snackBar.open(message, 'OK', this.config);

  }

}
