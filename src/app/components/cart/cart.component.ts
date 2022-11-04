import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Certificate} from "../../models/certificate";
import {Subscription} from "rxjs";
import {CertificatesService} from "../../services/certificates.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'], encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  eventSubscription: Subscription;
  certificateIds: number[];
  certificates: Certificate[];
  totalPrice: number;

  isValid: boolean;

  constructor(private cartService: CartService,
              private certificatesService: CertificatesService,
              private userService: UserService) {
    this.eventSubscription = this.cartService.productList.subscribe(() => {

      this.certificateIds = this.cartService.cartItemList;

      this.certificates?.forEach((certificate: Certificate) => {
        const originIndex = this.certificates.indexOf(certificate);
        const index = this.certificateIds.indexOf(parseInt(String(certificate.id), 10));
        if (index === -1) {
          this.certificates.splice(originIndex, 1);
        }
      });

      this.totalPrice = this.certificates?.reduce((sum, {price}) => sum + price, 0);
    })
  }

  ngOnInit(): void {
    this.isValid = this.userService.isUserLoggedIn();
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isValid = this.userService.isLoggedIn;
      if (this.isValid) {
        this.loadItems();
        this.totalPrice = this.certificates?.reduce((sum, {price}) => sum + price, 0);
      }
    })
  }

  loadItems() {
    this.certificateIds = this.cartService.cartProducts();
    this.certificates = [];
    this.certificateIds.forEach(id => {

      this.cartService.getCertificateById(id).subscribe((certificate) => {
        if (certificate !== undefined || Object.keys(certificate).length !== 0) {
          this.certificates.push(certificate);
          this.totalPrice = this.certificates?.reduce((sum, {price}) => sum + price, 0);
        }
      });
    });

  }

  getImage(imagePath: string) {
    return this.certificatesService.getImage(imagePath);
  }

  deleteFromCart(certificate: Certificate) {
    const index = this.certificateIds.indexOf(parseInt(String(certificate.id), 10));
    if (index !== -1) {
      this.cartService.removeCartItem(certificate);
    }

  }

  buyAll() {
    this.cartService.buyAllCart();
  }
}
