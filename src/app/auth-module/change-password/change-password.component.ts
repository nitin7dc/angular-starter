import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


import {AlertService, ApiService, UtilService, AuthService, UserService} from '../../core-module/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  loading = false;
  message: string;
  changePasswordForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private apiService: ApiService,
              private utilService: UtilService,
              private alertService: AlertService) {

    this.setupForms();

  }


  /**
   * Setup reset form.
   */
  setupForms() {

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ], this.validatePasswordMatch.bind(this))
    });

  }


  /**
   * Setup new password.
   */
  setNewPassword() {

    this.loading = true;
    this.message = 'please wait...';
    const user = this.userService.currentUser.getValue();
    const payload = Object.assign({email: user.email}, this.changePasswordForm.getRawValue());

    this.apiService.post('/auth/change-password', payload)
      .subscribe(data => {

        this.loading = false;
        this.message = '';
        this.alertService.success('Password changed. Please login with new password.');
        this.authService.signOut();
        this.router.navigateByUrl('/login');

      }, error => {

        this.loading = false;
        this.message = '';
        this.changePasswordForm.reset();
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
      if (control.value === this.changePasswordForm.get('password').value) {
        return resolve(null);
      }

      return resolve({validMatch: true});
    });

  }

}
