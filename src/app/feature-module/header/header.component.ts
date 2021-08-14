import {Component, OnDestroy, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import {Subscription} from 'rxjs';

import {AuthService} from '../../core-module/services';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {


  appName = environment.appName;

  @ViewChild('menu', { static: true }) menu: MatMenuTrigger;
  @Output() toggleMenu = new EventEmitter();

  constructor(public authService: AuthService,
              private router: Router) {

  }


  ngOnInit() {

  }


  ngOnDestroy() {

  }


}
