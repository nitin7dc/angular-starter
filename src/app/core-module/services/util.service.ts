import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {ApiService} from './api.service';

@Injectable()
export class UtilService {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private apiService: ApiService) {
  }

  /**
   * Fetch list of countries form backend.
   * @param country
   */
  countries(country: string) {
    // let params = new HttpParams();
    // params = params.set('country', country);
    // return this.apiService.get('/location/country', params);
  }


  /**
   * Fetch list cities for a query along with country.
   * @param country
   * @param city
   */
  cities(country: string, city: string) {
    // let params = new HttpParams();
    // params = params.set('country', country);
    // params = params.set('city', city);
    // return this.apiService.get('/location/city', params);
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
