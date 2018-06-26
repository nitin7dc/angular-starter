import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import {User} from './user.model';
import {AlertService, ApiService} from '../core-module/services';

@Injectable()
export class UserService {

  private currentUser = new BehaviorSubject<User>(new User(null));
  private loading = true;

  constructor(private apiService: ApiService,
              private alertService: AlertService) {

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
