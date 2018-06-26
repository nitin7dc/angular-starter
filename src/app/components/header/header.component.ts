import {Component, OnDestroy, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {Subscription} from 'rxjs';

import {AuthService} from '../../auth-module/auth.service';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {

  hideMenu = false;
  authSubscription: Subscription;
  appName = environment.appName;

  @ViewChild('menu') menu: MatMenuTrigger;
  @Output() toggleMenu = new EventEmitter();

  constructor(private authService: AuthService,
              private router: Router) {

    this.hideMenu = this.authService.hasLoggedIn();
    this.listenToAuthUpdates();

  }


  ngOnInit() {

  }


  ngOnDestroy() {

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

  }


  listenToAuthUpdates() {

    this.authSubscription = this.authService.authState
      .subscribe((data: boolean) => {
        this.hideMenu = data;
      });

  }

  /**
   * Go to other pages of application.
   * @param target
   */
  goTo(target: string) {

    this.router.navigateByUrl(target);

  }

  /**
   * Sign Out.
   */
  signOut() {

    this.authService.signOut();

  }


}
