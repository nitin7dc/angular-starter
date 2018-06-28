import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import {environment} from '../../../environments/environment';

import {AlertService, ApiService, UtilService, AuthService} from '../../core-module/services';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  loading = false;
  message: string;
  passwordResetToken = null;
  show = {
    passwordSet: false,
    passwordReset: true
  };
  user: FormGroup;
  account: FormGroup;
  website = environment.website;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private utilService: UtilService,
              private alertService: AlertService) {

    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams.token) {
      this.passwordResetToken = queryParams.token;
      this.toggleView('passwordSet');
      this.validateToken();
    } else {
      this.toggleView('passwordReset');
    }

    this.setupForms();

  }


  /**
   * Setup reset form.
   */
  setupForms() {

    this.user = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.utilService.EMAIL_REGEX)
      ])
    });

    this.account = new FormGroup({
      email: new FormControl({value: '', disabled: true}),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ], this.validatePasswordMatch.bind(this)),
      token: new FormControl(this.passwordResetToken)
    });

  }


  /**
   * Validate token present in password reset link.
   */
  validateToken() {

    this.loading = true;
    this.message = 'please wait...';

    this.apiService.get('/auth/validate-reset-token?token=' + this.passwordResetToken)
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.account.controls['email'].patchValue(data.email);
        this.toggleView('passwordSet');

      }, error => {

        this.loading = false;
        this.message = '';
        this.alertService.error(error);
        this.router.navigateByUrl('');

      });
  }


  /**
   * Send password reset link.
   */
  passwordReset() {

    this.loading = true;
    this.message = 'please wait...';

    this.apiService.post('/auth/password-reset', this.user.value)
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.alertService.success('Please check your mailbox for password reset link.');
        this.router.navigateByUrl('/login');

      }, error => {

        this.loading = false;
        this.message = '';
        this.alertService.error(error);

      });
  }


  /**
   * Setup new password.
   */
  setNewPassword() {

    this.loading = true;
    this.message = 'please wait...';

    this.apiService.post('/auth/password-set', this.account.getRawValue())
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.alertService.success('Password changed.');
        this.router.navigateByUrl('/login');

      }, error => {

        this.loading = false;
        this.message = '';
        this.account.reset();
        this.alertService.error(error);

      });
  }


  /**
   *  Toggle between
   *  - set password view
   *  - request password view
   *
   * @param {string} target
   */
  toggleView(target: string) {

    this.show.passwordSet = false;
    this.show.passwordReset = false;
    this.show[target] = true;

  }


  /**
   * Validate if password & confirmPassword match
   * @param {AbstractControl} control
   * @returns {Promise<any>}
   */
  validatePasswordMatch(control: AbstractControl) {

    return new Promise((resolve) => {
      if (control.value === this.account.get('password').value) {
        return resolve(null);
      }

      return resolve({validMatch: true});
    });

  }

}
