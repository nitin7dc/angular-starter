import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, ApiService, UserService, AuthService} from '../../core-module/services';
import {User} from '../user.model';

@Component({
  selector: 'app-two-step-setup',
  templateUrl: './two-step-setup.component.html',
  styleUrls: ['./two-step-setup.component.scss']
})
export class TwoStepSetupComponent implements OnInit {

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
    this.message = 'verifying otp...';
    const payload = {
      token: this.otp
    };

    this.apiService.post('/two-step/verify', payload)
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.user.twoStepVerificationEnabled = true;
        this.userService.currentUser.next(this.user);
        this.alertService.success('Verification Complete.');

      }, error => {

        this.reset();
        this.alertService.error(error);

      });

  }


  /**
   * Enable two step verification.
   *
   */
  turnOn() {

    this.loading = true;
    this.message = 'Generating QR CODE...';
    const payload = {
      email: 'nitin7dc@gmail.com',
    };

    this.apiService.post('/two-step/turn-on', payload)
      .subscribe(data => {

        this.qrCode = data.qrCode;
        this.loading = false;
        this.message = '';

      }, error => {

        this.reset();
        this.alertService.error(error);

      });

  }


  /**
   * Turn Off TWO STEP.
   *
   */
  turnOff() {

    this.loading = true;
    this.message = 'please wait...';
    this.apiService.post('/two-step/turn-off', {})
      .subscribe(data => {

        this.reset();
        this.user.twoStepVerificationEnabled = false;
        this.userService.currentUser.next(this.user);
        this.alertService.success('Two Step Verification Now Disabled.');

      }, error => {

        this.reset();
        this.alertService.error(error);

      });

  }


}
