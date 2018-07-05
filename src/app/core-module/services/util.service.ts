import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable()
export class UtilService {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private apiService: ApiService) {
  }

  /**
   * Fetch list of countries form backend.
   * @param country
   */
  countries(country: string): Observable<any> {

    return this.apiService.get(`/location/country?country=${country}`);

  }


  /**
   * Fetch list cities for a query along with country.
   * @param country
   * @param city
   */
  cities(country: string, city: string): Observable<any> {

    return this.apiService.get(
      `/location/country?country=${country}&city=${city}`
    );

  }


  /**
   * Validate if password & confirmPassword match
   * @param {AbstractControl} control
   * @returns {Promise<any>}
   */
  validatePasswordMatch(control: AbstractControl, context) {

    return new Promise((resolve, reject) => {
      if (control.value === context.account.get('password').value) {
        return resolve(null);
      }

      return resolve({validMatch: true});
    });

  }


  /**
   * Scroll to top of page.
   */
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
