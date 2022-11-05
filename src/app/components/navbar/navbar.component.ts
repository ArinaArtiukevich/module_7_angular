// import {Component, OnInit, ViewEncapsulation,} from '@angular/core';
//
// import {ShareNavBarRequestService} from "../../services/share-nav-bar-request.service";
// import {UserService} from "../../services/user.service";
// import {Subscription} from "rxjs";
//
// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'], encapsulation: ViewEncapsulation.None
// })
// export class NavbarComponent implements OnInit {
//   item_name: string;
//   eventSubscription: Subscription;
//   isLogged: boolean;
//
//   constructor(private sharedService: ShareNavBarRequestService, private userService: UserService) {
//     this.isLogged = this.userService.isUserLoggedIn();
//     this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
//       this.isLogged = this.userService.isLoggedIn;
//     })
//   }
//
//   ngOnInit(): void {
//   }
//
//   findByName() {
//     this.sharedService.certificateName.next(this.item_name);
//     this.sharedService.sendClientEvent();
//   }
//
//   logout() {
//     this.userService.logout();
//     window.location.reload();
//   }
//
// }
