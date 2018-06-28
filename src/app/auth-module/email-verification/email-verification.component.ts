import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, ApiService, UserService, AuthService} from '../../core-module/services';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {

  loading = false;
  message: string;
  token = null;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private alertService: AlertService) {

    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams.token) {
      this.token = queryParams.token;
      this.validateToken();
    } else {
      this.router.navigateByUrl('');
    }

  }


  /**
   * Validate token present in password reset link.
   */
  validateToken() {

    this.loading = true;
    this.message = 'please wait...';
    const body = {
      toke: this.token
    };

    this.apiService.put('/auth/email-verification', body)
      .subscribe((data) => {

        this.loading = false;
        this.message = '';
        this.alertService.success('Email verification complete.');
        this.authService.set(data.token);
        this.userService.set(data.user);
        this.router.navigateByUrl('home');

      }, error => {

        this.loading = false;
        this.message = '';
        this.alertService.error(error);
        this.router.navigateByUrl('');

      });
  }

}
