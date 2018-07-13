import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, ApiService, UserService, AuthService} from '../../core-module/services';
import {User} from '../user.model';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss']
})
export class TwoStepVerificationComponent implements OnInit {

  loading = false;
  message: string;
  user: User;
  qrCode;
  otp;

  constructor(private authService: AuthService,
              private router: Router,
              private apiService: ApiService,
              private alertService: AlertService,
              private userService: UserService) {

  }

  ngOnInit() {

    this.user = this.userService.currentUser.getValue();
    this.reset();

  }


  /**
   * Reset qrCodeImage and OTP CODE.
   */
  reset() {

    this.loading = false;
    this.message = '';
    this.qrCode = null;
    this.otp = null;

  }


  /**
   * Verify otp
   */
  verify() {

    this.loading = true;
    this.message = 'verifying...';
    const payload = {
      token: this.otp
    };

    this.apiService.post('/two-step/verify', payload)
      .subscribe(data => {

        this.authService.set(data.token);
        this.userService.set(data.user);
        this.router.navigateByUrl('/');

      }, error => {

        this.reset();
        this.alertService.error(error);

      });

  }

}
