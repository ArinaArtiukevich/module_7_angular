import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Tag} from "../../models/tag";
import {Subscription} from "rxjs";
import {TagService} from "../../services/tag.service";
import {ShareNavBarRequestService} from "../../services/share-nav-bar-request.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'], encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  private loading: boolean = false;
  private limit: number = 9;
  private page: number = 1;
  tags: Tag[] = [];
  private isTagEnded: boolean = false;
  eventSubscription: Subscription;

  isValid: boolean;

  constructor(private tagService: TagService,
              private sharedService: ShareNavBarRequestService,
              private userService: UserService) {
  };


  ngOnInit(): void {
    this.isValid = this.userService.isUserLoggedIn();
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isValid = this.userService.isLoggedIn;
      if (this.isValid) {
        this.isTagEnded = false;
        this.getTagsByPage(this.page);
      }
    })
  }

  getImage(imagePath: string) {
    let image = "../assets/grey_image.jpeg";
    if (imagePath !== null) {
      image = "http://127.0.0.1:8082" + imagePath;
    }
    return image;
  }

  getTagsByPage(page: number) {
    this.tagService.getByPage(page, this.limit).subscribe((tag) => {
      if (tag === undefined || tag["_embedded"] === undefined) {
        this.isTagEnded = true;
      } else {
        this.tags.push(...tag["_embedded"]["tagRepresentationList"]);
      }
      this.loading = false;
    });
  }

  getCertificatesByTag(name: string) {
    this.sharedService.tagName.next(name);
    this.sharedService.sendClientEvent();

  }

  onScrollCategory() {
    if (!this.isTagEnded) {
      this.loading = true;
      this.getTagsByPage(++this.page);
    }
  }
}
