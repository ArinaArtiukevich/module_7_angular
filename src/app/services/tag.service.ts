import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Certificate} from "../models/certificate";
import {catchError, delay, Observable, throwError} from "rxjs";
import {Tag} from "../models/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  tags: Tag[] = [];


  getByPage(page: number, limit: number): Observable<Tag[]> {
    let customHeaders = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);

    return this.http.get<Certificate[]>('http://localhost:8080/tags', {
      headers: customHeaders,
      params: new HttpParams().appendAll({'page': page, 'size': limit})
    }).pipe(
      delay(2000),
      catchError(this.errorHandler.bind(this))
    );
  }

  getAll(): Observable<Tag[]> {
    let customHeaders = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);

    return this.http.get<Certificate[]>('http://localhost:8080/tags', {
      headers: customHeaders,
      params: new HttpParams().appendAll({'page': 1, 'size': 1000})
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  add(tag: FormData): Observable<Tag> {

    let customHeaders = new HttpHeaders()
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    return this.http.post<Tag>('http://localhost:8080/tags', tag, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle("Server problem. Operation went wrong.");
    return throwError(() => error.message);
  }
}
