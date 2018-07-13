import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';


@Injectable()
export class UtilService {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private apiService: ApiService) {
  }

  public static match(field: string, confirmField: string): Function {

    return (group: FormGroup): { [key: string]: any } => {
      if (group.controls[field] && group.controls[confirmField]) {
        return (group.controls[field].value !== group.controls[confirmField].value) ? {'match': true} : null;
      }
    };

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
