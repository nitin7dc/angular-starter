import {Routes, RouterModule} from '@angular/router';

import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const authRouting: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      },
      {
        path: 'email-verification',
        component: EmailVerificationComponent
      }
    ]
  }
];

export const AuthRoutes = RouterModule.forChild(authRouting);
