import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class AuthService {

  authState = new BehaviorSubject<boolean>(false);

  constructor() {

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

  }


  /**
   * Simple check if user's is already authenticated.
   */
  hasLoggedIn(): any {

    return this.authState.getValue();

  }

}
