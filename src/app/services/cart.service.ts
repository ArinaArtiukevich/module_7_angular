import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, delay, Observable, throwError} from "rxjs";
import {Certificate} from "../models/certificate";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  keyName = "coupons";
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);

  public boughtListUpdated = new BehaviorSubject<any>([]);

  params: any;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  addToCart(product: Certificate) {
    let certificates = this.cartProducts();
    const index = certificates.indexOf(product.id);

    if (index === -1) {
      certificates.push(product.id);

    } else {
      certificates.splice(index, 1);
    }

    this.cartItemList = certificates;
    this.productList.next(this.cartItemList);
    localStorage.setItem(this.keyName, JSON.stringify(this.cartItemList));
  }

  cartProducts() {
    const certificatesLocalStorage = localStorage.getItem(this.keyName);
    if (certificatesLocalStorage !== null) {
      this.cartItemList = JSON.parse(certificatesLocalStorage);
      this.productList.next(this.cartItemList);
      return this.cartItemList;
    }
    return [];
  }


  removeCartItem(product: Certificate) {
    let certificates = this.cartProducts();
    const index = certificates.indexOf(parseInt(String(product.id), 10));
    if (index !== -1) {
      certificates.splice(index, 1);
    }

    this.cartItemList = certificates;
    this.productList.next(this.cartItemList);
    localStorage.setItem(this.keyName, JSON.stringify(this.cartItemList));
  }

  buyAllCart() {
    let idUser = sessionStorage.getItem("id");
    let customHeaders = this.getHeader();
    if (idUser !== null) {
      this.cartItemList.forEach((id: number) => {

        this.http.patch<Certificate>("http://localhost:8080/users/" + idUser,
          JSON.stringify({"certificates": [{"id": id}]}),
          {headers: customHeaders})
          .pipe(
            catchError(this.errorHandler.bind(this))
          ).subscribe(() => {
          this.cartItemList = [];
          this.productList.next(this.cartItemList);
          this.boughtListUpdated.next(this.cartItemList);
        });
      })

    }
  }

  getCertificateById(id: number): Observable<Certificate> {
    let customHeaders = this.getHeader();
    return this.http.get<Certificate>("http://localhost:8080/certificates/" + id, {
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

}
