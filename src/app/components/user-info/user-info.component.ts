// import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// import {Subscription} from "rxjs";
// import {UserService} from "../../services/user.service";
// import {CartService} from "../../services/cart.service";
// import {CertificatesService} from "../../services/certificates.service";
// import {User} from "../../models/user";
// import {ErrorService} from "../../services/error.service";
//
// @Component({
//   selector: 'app-user-info',
//   templateUrl: './user-info.component.html',
//   styleUrls: ['./user-info.component.scss'], encapsulation: ViewEncapsulation.None
// })
// export class UserInfoComponent implements OnInit {
//
//   eventSubscription: Subscription;
//   user: User;
//   admin = "ROLE_ADMIN";
//   isValid: boolean;
//
//   constructor(private userService: UserService,
//               private cartService: CartService,
//               private certificatesService: CertificatesService,
//               private error: ErrorService
//   ) {
//     this
//       .eventSubscription = this.cartService.boughtListUpdated.subscribe(() => {
//       this.loadInfo();
//     })
//   }
//
//   ngOnInit(): void {
//     this.isValid = this.userService.isUserLoggedIn();
//     this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
//       this.isValid = this.userService.isLoggedIn;
//       if (this.isValid) {
//         this.loadInfo();
//       }
//     })
//   }
//
//   loadInfo() {
//     let idUserString = sessionStorage.getItem("id");
//
//     if (idUserString !== null && !isNaN(Number(idUserString)) && Number(idUserString) !== 0) {
//       let idUser = Number(idUserString);
//       this.userService.getUserInfo(Number(idUser)).subscribe((result: User) => {
//           this.user = result;
//         }, error => {
//           this.error.handle("You are not allowed to see the content.")
//         }
//       );
//     }
//   }
//
//   getImage(imagePath: string) {
//     return this.certificatesService.getImage(imagePath);
//   }
//
//
// }
