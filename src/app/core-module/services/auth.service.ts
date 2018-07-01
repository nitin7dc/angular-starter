import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {

  authState = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {

    const token = localStorage.getItem('token');
    this.authState.next(!!token);

  }


  /**
   * Save token to local-storage.
   * @param token
   */
  set(token: any) {

    localStorage.setItem('token', token);
    this.authState.next(true);

  }

  /**
   * Clear local-storage and sign out.
   */
  signOut(): void {

    localStorage.clear();
    this.authState.next(false);
    this.router.navigateByUrl('/auth/login');

  }


  /**
   * Simple check if user's is already authenticated.
   */
  hasLoggedIn(): any {

    return this.authState.getValue();

  }

}
