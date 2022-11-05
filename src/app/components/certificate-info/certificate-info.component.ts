// import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// import {Subscription} from "rxjs";
// import {ActivatedRoute, Router} from "@angular/router";
// import {Certificate} from "../../models/certificate";
// import {CertificatesService} from "../../services/certificates.service";
// import {CartService} from "../../services/cart.service";
// import {UserService} from "../../services/user.service";
// import {ErrorService} from "../../services/error.service";
//
// @Component({
//   selector: 'app-certificate-info',
//   templateUrl: './certificate-info.component.html',
//   styleUrls: ['./certificate-info.component.scss'], encapsulation: ViewEncapsulation.None
// })
// export class CertificateInfoComponent implements OnInit {
//   readonly labelAdd = "Add to Cart";
//   readonly labelDelete = "Delete";
//   isAdmin = false;
//   role = "ROLE_ADMIN";
//   idCertificate: number;
//   certificate: Certificate;
//   private subscription: Subscription;
//   eventSubscription: Subscription;
//
//   isValid: boolean;
//
//   constructor(private activateRoute: ActivatedRoute,
//               private certificateService: CertificatesService,
//               private cartService: CartService,
//               private userService: UserService,
//               private error: ErrorService,
//   ) {
//     this.subscription = activateRoute.params.subscribe(params => {
//       this.idCertificate = params['id'];
//       this.certificateService.get(this.idCertificate).subscribe((certificate) => {
//         if (certificate === undefined) {
//           this.error.handle("Certificate was not found");
//         } else {
//           this.error.clear();
//           this.certificate = certificate;
//         }
//       });
//     });
//   }
//
//   ngOnInit(): void {
//
//     this.isValid = this.userService.isUserLoggedIn();
//     this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
//       this.isValid = this.userService.isLoggedIn;
//       if (this.isValid && this.userService.isUserAdmin()) {
//         this.isAdmin = true;
//       }
//     })
//     if (this.isValid && this.userService.isUserAdmin()) {
//       this.isAdmin = true;
//     }
//   }
//
//   addToCart(certificate: Certificate) {
//     this.cartService.addToCart(certificate);
//   }
//
//   getCertificates(): number[] {
//     return this.cartService.cartProducts();
//   };
//
//   deleteFromCart(certificate: Certificate) {
//     this.cartService.removeCartItem(certificate);
//   }
//
//   getImage(imagePath: string) {
//     return this.certificateService.getImage(imagePath);
//   }
//
// }
