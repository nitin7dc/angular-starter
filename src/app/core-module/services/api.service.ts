import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

  server = environment.api;
  authenticationFailEvent = new EventEmitter();

  constructor(private http: HttpClient) {
  }


  /**
   * Set headers.
   * @return {HttpHeaders}
   */
  private setHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const options = {
      'content-type': 'application/json',
      'authorization': token || '',
      'user': user || '',
      'client-time': new Date().toISOString()
    };
    return new HttpHeaders(options);

  }


  /**
   * Handle known errors
   * @param error
   * @return {Observable<never>}
   */
  private handleError(error) {

    if (error && error.status === 401) {
      this.authenticationFailEvent.emit(401);
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.log(error);
      return throwError(error);
    }

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
        headers: this.setHeaders(),
        params: params
      }
    ).pipe(
      catchError(this.handleError)
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
        headers: this.setHeaders(),
        params: params
      }
    ).pipe(
      catchError(this.handleError)
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
        headers: this.setHeaders(),
        params: params
      }
    ).pipe(
      catchError(this.handleError)
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
        headers: this.setHeaders(),
        params: params
      }
    ).pipe(
      catchError(this.handleError)
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
        headers: this.setHeaders(),
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

}
