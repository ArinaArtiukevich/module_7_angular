import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {User} from "../models/user";

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
    this.message.emit("Could not find user.");
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

  idUser(): number {
    if (this.isUserLoggedIn()) {
      return Number(sessionStorage.getItem(this.ID));
    }
    return -1;
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
