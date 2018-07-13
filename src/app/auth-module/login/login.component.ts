import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {trigger, state, transition, animate, style} from '@angular/animations';

import {environment} from '../../../environments/environment';

import {AlertService, ApiService, UtilService, UserService, AuthService} from '../../core-module/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('visible', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ])
  ]
})
export class LoginComponent {

  loading = false;
  message: string;
  user: FormGroup;
  website = environment.website;
  visible = 'hide';

  constructor(private authService: AuthService,
              private router: Router,
              private apiService: ApiService,
              private utilService: UtilService,
              private alertService: AlertService,
              private userService: UserService) {

    if (this.authService.hasLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.setupForms();
    setTimeout(() => {
      this.visible = 'show';
    }, 175);

  }


  setupForms() {

    this.user = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.utilService.EMAIL_REGEX)
      ]),
      password: new FormControl('', [Validators.required])
    });

  }

  /****************************************************************************************************************
   *  LOGIN
   *****************************************************************************************************************/


  /**
   * Email/Password login.
   */
  login() {

    this.loading = true;
    this.message = 'logging in...';

    this.apiService.post('/auth/login', this.user.value)
      .subscribe(data => {

        // Email verification is pending.
        if (!data.emailVerified) {
          this.loading = false;
          this.message = '';
          this.user.reset();
          return this.alertService.info(`
            Please verify your email first. Verification email sent.
          `);
        }


        // two step verification is enabled ask for code.
        if (data.twoStepVerificationEnabled) {
          this.authService.set(data.token);
          return this.router.navigateByUrl('/auth/two-step-verification');
        }


        // normal login.
        this.authService.set(data.token);
        this.userService.set(data.user);
        this.router.navigateByUrl('/');

      }, error => {

        this.loading = false;
        this.message = '';
        this.user.reset();
        this.alertService.error(error);

      });

  }

  sendVerification() {
    this.apiService.post('/auth/email-verification');
  }


}
