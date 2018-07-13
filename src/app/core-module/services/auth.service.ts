import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from './user.service';


@Injectable()
export class AuthService {

  authState = new BehaviorSubject<boolean>(false);
  token;

  constructor(private router: Router, private userService: UserService) {

    this.token = localStorage.getItem('token');
    this.authState.next(!!this.token);

  }


  /**
   * Save token to local-storage.
   * @param token
   */
  set(token: any) {

    localStorage.setItem('token', token);
    this.authState.next(true);
    this.token = token;

  }

  /**
   * Clear local-storage and sign out.
   */
  signOut(): void {

    localStorage.clear();
    this.token = null;
    this.authState.next(false);
    this.userService.reset();
    this.router.navigateByUrl('/auth/login');

  }


  /**
   * Simple check if user's is already authenticated.
   */
  hasLoggedIn(): any {

    return this.authState.getValue();

  }

}
