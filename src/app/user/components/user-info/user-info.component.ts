import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {CartService} from "../../../services/cart.service";
import {CertificatesService} from "../../../services/certificates.service";
import {ErrorService} from "../../../services/error.service";
import {ActivatedRoute} from "@angular/router";
import {UserRole} from "../../../models/enum/user-role.enum";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'], encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {
  eventSubscription: Subscription;
  user: User;
  admin = "ROLE_ADMIN";
  isValid: boolean;
  idUserRequest: number;
  routeSubscription: Subscription;

  constructor(private userService: UserService,
              private cartService: CartService,
              private certificatesService: CertificatesService,
              private error: ErrorService,
              private activateRoute: ActivatedRoute,
  ) {
    this.eventSubscription = this.cartService.boughtListUpdated.subscribe(() => {
      this.loadInfo();
    })
    this.routeSubscription = activateRoute.params.subscribe(params => {
      this.idUserRequest = params['id'];
    });
  }

  ngOnInit(): void {
    this.isValid = this.userService.isUserLoggedIn();
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isValid = this.userService.isLoggedIn;
      if (this.isValid) {
        this.loadInfo();
      }
    })
  }

  loadInfo() {
    let idUserString = sessionStorage.getItem("id");

    if (idUserString !== null && !isNaN(Number(idUserString)) && Number(idUserString) !== 0 && this.idUserRequest > 0) {
      this.userService.getUserInfo(this.idUserRequest).subscribe((result: User) => {
          this.user = result;
        }, error => {
          this.error.handle("You are not allowed to see the content.")
        }
      );
    }

  }

  getImage(imagePath: string) {
    return this.certificatesService.getImage(imagePath);
  }


}

