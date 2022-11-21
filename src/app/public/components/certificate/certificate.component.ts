import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Subscription} from "rxjs";
import {Certificate} from "../../models/certificate";
import {CertificatesService} from "../../services/certificates.service";
import {ShareNavBarRequestService} from "../../services/share-nav-bar-request.service";

import {UserService} from "../../services/user.service";
import {CurrentUserService} from "../../../user/services/current-user.service";


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'], encapsulation: ViewEncapsulation.None

})
export class CertificateComponent implements OnInit {
  certificateNameSearch: string;
  currentTagValue: string;

  eventSubscription: Subscription;
  loading: boolean = false;
  private limit: number = 5;
  private page: number = 1;
  certificates: Certificate[];
  private isCertificatesEnded: boolean;
  private readonly keyName = 'certificates'
  private readonly keyLikedName = 'likedCertificates';
  readonly labelAdd = "Add to Cart";
  readonly labelDelete = "Delete";
  isValid: boolean;

  constructor(private certificatesService: CertificatesService,
              private shareNavBarRequestService: ShareNavBarRequestService,
              private cartService: CurrentUserService,
              private userService: UserService) {
    this.isCertificatesEnded = false;
    this.eventSubscription = this.shareNavBarRequestService.certificateName.subscribe((value) => {
      this.certificateNameSearch = value;
    });
    this.eventSubscription = this.shareNavBarRequestService.tagName.subscribe((value) => {
      this.currentTagValue = value === "All categories" ? "" : value;
    });
    this.eventSubscription = this.shareNavBarRequestService.getClientEvent().subscribe(() => {
      this.getCertificatesByWithParameters(this.certificateNameSearch, this.currentTagValue);
    });
  };

  ngOnInit(): void {
    this.isValid = this.userService.isUserLoggedIn();
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isValid = this.userService.isLoggedIn;
      if (this.isValid) {
        this.certificates = [];
        this.isCertificatesEnded = false;
        this.getCertificatesByPage(this.page);
      }
    })
  };

  getCertificatesByWithParameters = (name: string, currentTagValue: string): void => {
    this.isCertificatesEnded = false;
    this.page = 1;
    this.certificates = [];
    this.getCertificatesByPage(this.page, name, currentTagValue);

  };


  getCertificatesByPage(page: number, name?: string, currentTagValue?: string) {
    this.certificatesService.getByPage(page, this.limit, name, currentTagValue).subscribe((certificates) => {
      if (certificates === undefined || certificates["_embedded"] === undefined) {
        this.isCertificatesEnded = true;
      } else {
        this.certificates.push(...certificates["_embedded"]["certificateRepresentationList"]);
      }
      this.loading = false;
    });
  }

  deleteFromCart(certificate: Certificate) {
    this.cartService.removeCartItem(certificate);
  }

  addToCart(certificate: Certificate) {
    this.cartService.addToCart(certificate);
  }

  getCertificates(): number[] {
    return this.cartService.cartProducts();
  };

  putCertificates(idCertificate: number) {
    let certificates = this.getCertificates();
    let pushCertificate = false;
    const index = certificates.indexOf(idCertificate);

    if (index === -1) {
      certificates.push(idCertificate);
      pushCertificate = true;
    } else {
      certificates.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(certificates));
    return {
      pushCertificate,
      certificates
    };
  };

  deleteCertificate(idCertificate: number) {
    let certificates = this.getCertificates();
    const index = certificates.indexOf(parseInt(String(idCertificate), 10));
    if (index !== -1) {
      certificates.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(certificates));
  };

  getLikedCertificates(): number[] {
    const certificatesLikedLocalStorage = localStorage.getItem(this.keyLikedName);
    if (certificatesLikedLocalStorage !== null) {
      return JSON.parse(certificatesLikedLocalStorage);
    }
    return [];
  };

  putLikedCertificates(idCertificate: number) {
    let likedCertificates = this.getLikedCertificates();
    let pushLikedCertificate = false;
    const index = likedCertificates.indexOf(idCertificate);

    if (index === -1) {
      likedCertificates.push(idCertificate);
      pushLikedCertificate = true;
    } else {
      likedCertificates.splice(index, 1);
    }
    localStorage.setItem(this.keyLikedName, JSON.stringify(likedCertificates));
    return {
      pushLikedCertificate,
      likedCertificates
    };
  };

  getImage(imagePath: string) {
    return this.certificatesService.getImage(imagePath);
  }

  onScroll() {
    if (!this.isCertificatesEnded) {
      this.loading = true;
      this.getCertificatesByPage(++this.page, this.certificateNameSearch, this.currentTagValue);
    }
  }


}
