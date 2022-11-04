import {EventEmitter, Injectable, Input} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {BehaviorSubject, catchError, delay, Observable, throwError} from "rxjs";
import {Certificate} from "../models/certificate";
import {User} from "../models/user";
import {Tag} from "../models/tag";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  message = new EventEmitter<string>();
  ADMIN = "ROLE_ADMIN";
  ACCESS_TOKEN = "access_token";
  ID = "id";
  ROLE = "role";
  isLoggedIn = false;

  public isLoggedInSubject = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient
  ) {

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

  getUserInfo(id: number): Observable<User> {
    let customHeaders = this.getHeader()
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    return this.http.get<User>('http://localhost:8080/users/' + id, {
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

  authentificateUser(value: any) {
    sessionStorage.setItem(this.ACCESS_TOKEN, value["token"]);
    sessionStorage.setItem(this.ID, value["userRepresentation"]["id"]);
    sessionStorage.setItem(this.ROLE, value["userRepresentation"]["role"]);
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(this.isLoggedIn);
  }

  isUserLoggedIn() {
    this.isLoggedIn = sessionStorage.getItem(this.ID) !== null;
    return this.isLoggedIn;
  }

  isUserAdmin() {
    let currentRole = sessionStorage.getItem(this.ROLE);
    return currentRole === this.ADMIN;
  }

  logout() {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.removeItem(this.ID);
    sessionStorage.removeItem(this.ROLE);
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(this.isLoggedIn);
  }
}
