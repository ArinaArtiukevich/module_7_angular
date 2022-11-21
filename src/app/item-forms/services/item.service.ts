import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Tag} from "../../public/models/tag";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ErrorService} from "../../public/services/error.service";
import {Certificate} from "../../public/models/certificate";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
  }

  tags: Tag[] = [];

  add(tag: FormData): Observable<Tag> {

    let customHeaders = new HttpHeaders()
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    return this.http.post<Tag>('http://localhost:8080/tags', tag, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  addCertificate(certificate: FormData): Observable<Certificate> {

    let customHeaders = new HttpHeaders()
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    return this.http.post<Certificate>('http://localhost:8080/certificates', certificate, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  patch(certificate: FormData, id: number): Observable<Certificate> {

    let customHeaders = new HttpHeaders()
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    return this.http.patch<Certificate>('http://localhost:8080/certificates/' + id, certificate, {
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
