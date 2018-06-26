import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {trigger, state, transition, animate, style} from '@angular/animations';

import {environment} from '../../../environments/environment';

import {AlertService, ApiService, UtilService} from '../../core-module/services';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';

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


  /**
   * Animation & send to artworks page.
   */
  close() {

    setTimeout(() => {
      this.visible = 'hide';
      this.router.navigateByUrl('/artworks');
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

        if (data.user.is_email_verified) {
          // this.authService.setup(data.token);
          // this.userService.set(data.user);
          return this.router.navigateByUrl('/');
        }

        this.loading = false;
        this.message = '';
        this.user.reset();
        this.alertService.info(`
        Please verify your email first. Verification email sent.
        `);

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
