import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, throwError} from "rxjs";
import {Certificate} from "../models/certificate";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  params: any;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  certificates: Certificate[] = [];

  getAll(): Observable<Certificate[]> {
    let customHeaders = this.getHeader();

    return this.http.get<Certificate[]>('http://localhost:8080/certificates', {
      headers: customHeaders,
      params: new HttpParams().appendAll({'page': 1, 'size': 1000})
    }).pipe(
      delay(2000),
      catchError(this.errorHandler.bind(this))
    );
  }

  getByPage(page: number, limit: number, name?: string, tagName?: string): Observable<Certificate[]> {
    this.params = {'page': page, 'size': limit};
    if (name !== undefined && name !== null && name !== '') {
      this.params = {
        ...this.params,
        name: name
      }
    }
    if (tagName !== undefined && tagName !== null && tagName !== '') {
      this.params = {
        ...this.params,
        tag: tagName
      }
    }

    let customHeaders = this.getHeader();

    return this.http.get<Certificate[]>('http://localhost:8080/certificates', {
      headers: customHeaders,
      params: new HttpParams().appendAll(this.params)
    }).pipe(
      delay(2000),
      catchError(this.errorHandler.bind(this))
    );
  }

  get(id: number): Observable<Certificate> {
    let customHeaders = this.getHeader();

    return this.http.get<Certificate>('http://localhost:8080/certificates/' + id, {
      headers: customHeaders
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  add(certificate: FormData): Observable<Certificate> {

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

  private getHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle("Server problem. Operation went wrong.");
    return throwError(() => error.message);
  }

  getImage(imagePath: string) {
    let image = "../assets/grey_image.jpeg";
    if (imagePath !== null) {
      image = "http://127.0.0.1:8082" + imagePath;
    }
    return image;

  }

}
