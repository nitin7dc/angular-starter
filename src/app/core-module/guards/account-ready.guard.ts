import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AlertService, UserService} from '../services';

@Injectable()
export class AccountReadyGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService,
              private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const user: any = this.userService.currentUser.getValue();
    // run custom logic.

    return true;
  }
}
