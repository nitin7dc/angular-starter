import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

  server = environment.api;
  authenticationFailEvent = new EventEmitter();

  constructor(private http: HttpClient) {

  }


  /**
   * Get request.
   *
   * @param {string} path
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    const url = `${this.server.url}${path}`;
    return this.http.get(
      url,
      {
        params: params
      }
    );

  }


  /**
   * Put request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  put(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    const url = `${this.server.url}${path}`;
    return this.http.put(
      url,
      body,
      {
        params: params
      }
    );

  }


  /**
   * Patch Request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  patch(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    const url = `${this.server.url}${path}`;
    return this.http.patch(
      url,
      body,
      {
        params: params
      }
    );

  }


  /**
   * Post Request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  post(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    const url = `${this.server.url}${path}`;
    return this.http.post(
      url,
      body,
      {
        params: params
      }
    );

  }


  /**
   * Delete Request.
   *
   * @param {string} path
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  delete(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {

    const url = `${this.server.url}${path}`;
    return this.http.delete(
      url,
      {
        params: params
      });
  }

}
