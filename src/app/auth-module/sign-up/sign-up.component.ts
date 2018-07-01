import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {trigger, state, transition, animate, style} from '@angular/animations';

import {AlertService, ApiService, UtilService} from '../../core-module/services';
import {UserService} from '../../core-module/services/user.service';
import {AuthService} from '../../core-module/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent {

  loading = false;
  message = '';
  accountForm: FormGroup;
  invitationToken = null;
  visible = 'hide';

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private utilService: UtilService,
              private alertService: AlertService,
              private userService: UserService) {

    if (this.authService.hasLoggedIn()) {
      this.router.navigateByUrl('home');
    }

    this.prepareForms();
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams.token) {
      this.invitationToken = decodeURIComponent(queryParams.token);
      this.accountForm.patchValue({email: decodeURIComponent(queryParams.email)});
      this.accountForm.controls['email'].disable();
    }

    setTimeout(() => {
      this.visible = 'show';
    }, 175);

  }


  prepareForms() {

    this.accountForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.utilService.EMAIL_REGEX)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ], this.validatePasswordMatch.bind(this)),
      iAgree: new FormControl('', [Validators.required])
    });

  }

  /****************************************************************************************************************
   *  SIGN UP
   *****************************************************************************************************************/

  /**
   * Handle sign up form
   */
  signUp() {

    if (this.invitationToken) {
      this.acceptInvite();
    } else {
      this.createAccount();
    }

  }

  /**
   * Create a new auth.
   */
  createAccount() {

    this.loading = true;
    this.message = 'signing up...';

    this.apiService.post('/auth/sign-up', this.accountForm.value)
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.alertService.success(data.message);
        this.router.navigateByUrl('/');

      }, error => {

        this.loading = false;
        this.message = '';
        this.accountForm.reset();
        this.alertService.error(error);

      });
  }


  /**
   * Validate if password & confirmPassword match
   * @param {AbstractControl} control
   * @returns {Promise<any>}
   */
  validatePasswordMatch(control: AbstractControl) {

    return new Promise((resolve) => {
      if (control.value === this.accountForm.get('password').value) {
        return resolve(null);
      }

      return resolve({validMatch: true});
    });

  }


  /****************************************************************************************************************
   *  Invitation
   *  When user is coming with an tokenized invitation.
   *****************************************************************************************************************/


  /**
   * Validate token present in password reset link.
   */
  acceptInvite() {

    this.loading = true;
    this.message = 'signing up...';
    const payload = this.accountForm.getRawValue();
    payload.token = this.invitationToken;

    this.apiService.post('/auth/accept-invite', payload)
      .subscribe(data => {

        this.authService.set(data.token);
        this.userService.set(data.user);
        this.loading = false;
        this.message = '';
        this.alertService.success('Sign-up Complete.');
        this.router.navigateByUrl('/');

      }, error => {
        this.loading = false;
        this.message = '';
        this.accountForm.reset();
        this.alertService.error(error);
      });

  }


}
