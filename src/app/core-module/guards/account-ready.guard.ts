import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AlertService, UserService} from '../services';
import {environment} from '../../../environments/environment';

@Injectable()
export class AccountReadyGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService,
              private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const user: any = this.userService.currentUser.getValue();
    const ignoreFields = ['__v', 'company', 'subscribeToUpdates', 'isAdmin', 'active', 'wallet', 'profileImage'];
    let profileComplete = true;

    if (environment.admin) {
      return true;
    }

    for (const key in user) {
      if (user.hasOwnProperty(key) && (ignoreFields.indexOf(key) === -1)) {
        profileComplete = profileComplete && (!!user[key]);
      }
    }

    // profileComplete = profileComplete && (!!user.wallet.address);

    if (!profileComplete) {
      this.alertService.info('Please complete your profile first.');
      this.router.navigateByUrl('/account?edit=true');
      return false;
    }

    return true;
  }
}
