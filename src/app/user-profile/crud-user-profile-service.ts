import {  catchError} from 'rxjs/operators';
import {  Injectable} from '@angular/core';
import {  HttpClient,  HttpHeaders,  HttpErrorResponse} from '@angular/common/http';
import {  throwError} from 'rxjs';


// httpOptions for set header options
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'// ,
    //'authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIFtUSVBPX0RPQ1VNRU5UT10iLCJyb2xlcyI6W10sImV4cCI6MTUzMDQ1MTMyOX0.vgQVWw4R3KzOp2loBeIIY_LH8GscFdeNkKTxtzMgUM1O4vNS0k8O3-41WbgWQT3vPiqevpKezaPfOlpMdM7ZyA', //window.localStorage.getItem('access_token'), // Add auth token options
  }),
};

const path = "http://localhost:8021";
const ERROR_BACK = 'ERROR_';

@Injectable({
  providedIn: 'root'
})

export class CrudUserProfileService {

  constructor(private http: HttpClient) {}

  get(endpoint) {
    return this.http.get(path + endpoint, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  post(endpoint, element) {
    return this.http.post(path + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  put(endpoint, element) {
    return this.http.put(path + endpoint + '/' + element.Id, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  delete(endpoint, element) {
    return this.http.delete(path + endpoint + '/' + element.Id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    // console.log( ' MANEJO DE ERROR FNA-SERVICE:  ' + JSON.stringify(error) );
    // console.log( ' ERROR.ERROR : ' + error.error );

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      try {
          // console.log( '  TITLE : ' + error.error.title );
          if ( typeof error.error.title !== undefined
            && error.error.title.includes(ERROR_BACK)) {
            return throwError( error.error.title + '-' + (error.error.developerMessage || error.error.detail || ''));
          }
        } catch ( _error) {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
      }
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
