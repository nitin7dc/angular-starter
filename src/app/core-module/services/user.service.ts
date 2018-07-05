import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {User} from '../../auth-module/user.model';
import {AlertService} from './alerts.service';
import {ApiService} from './api.service';

@Injectable()
export class UserService implements Resolve<Observable<any>> {

  public currentUser = new BehaviorSubject<User>(new User(null));
  private loading = true;

  constructor(private apiService: ApiService,
              private alertService: AlertService) {

  }

  resolve(): Observable<any> {
    if (this.currentUser.getValue()._id) {
      return Observable.create((observer) => {

        observer.next(this.currentUser.getValue());
        observer.complete();

      });
    } else {
      return this.load();
    }
  }

  load(): Observable<any> {

    this.loading = true;
    const user_id = localStorage.getItem('user');
    if (!user_id) {
      this.apiService.authenticationFailEvent.emit(401);
      return this.currentUser.asObservable();
    }

    return Observable.create((observer) => {

      this.apiService.get(`/users/${user_id}`)
        .subscribe(data => {

          this.loading = false;
          this.currentUser.next(new User(data));
          observer.next(this.currentUser.getValue());
          observer.complete();

        }, error => {

          this.apiService.authenticationFailEvent.emit(401);
          observer.complete();

        });

    });

  }

  set(data) {
    localStorage.setItem('user', data._id);
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
