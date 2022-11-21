import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {User} from "../../public/models/user";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  message = new EventEmitter<string>();
  ID = "id";

  public isLoggedInSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  login(user: JSON): Observable<User> {
    let customHeaders = this.getHeader();

    return this.http.post<User>('http://localhost:8080/auth/signin', user, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  signup(user: JSON): Observable<User> {
    let customHeaders = this.getHeader();

    return this.http.post<User>('http://localhost:8080/auth/signup', user, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }
  private getHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
  }

  private errorHandler(error: HttpErrorResponse) {
    this.message.emit("Authentication was not completed.");
    return throwError(() => "Authentication was not completed.");
  }
}
