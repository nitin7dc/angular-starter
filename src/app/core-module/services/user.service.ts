import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {User} from '../../auth-module/user.model';
import {AlertService,} from './alerts.service';
import {ApiService} from './api.service';

@Injectable()
export class UserService {

  public currentUser = new BehaviorSubject<User>(new User(null));
  private loading = true;

  constructor(private apiService: ApiService,
              private alertService: AlertService) {

  }

  set(data) {
    this.currentUser.next(new User(data));
  }


  /**
   * Update user.
   * @param context
   * @param user
   */
  patch(context, user) {

    context.loading = true;
    context.userForm.disable();
    delete user.email;

    this.apiService.patch(`/users/${user._id}`, user)
      .subscribe(data => {

        context.loading = false;
        this.currentUser.next(new User(data));
        context.userForm.enable();
        this.alertService.success('Changes Saved.');

      }, error => {

        context.loading = false;
        context.userForm.enable();
        console.log(error);
        this.alertService.error(error);

      });
  }

}
