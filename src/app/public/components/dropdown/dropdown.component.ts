import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../models/tag";
import {Subscription} from "rxjs";
import {TagService} from "../../services/tag.service";
import {ShareNavBarRequestService} from "../../services/share-nav-bar-request.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class DropdownComponent implements OnInit {
  @Input() title: string;
  @Output() currentValueChange = new EventEmitter();
  DEFAULT_VALUE_DROPDOWN = "All categories";

  limit: number = 5;
  page: number = 1;
  isTagsEnded: boolean = false;
  tags: Tag[] = [];
  public currentValue: Tag;
  public allCategories: Tag;
  public dropdownOpen: boolean = false;

  isValid: boolean;

  public get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list')
  }

  private currentIndex = -1;
  eventSubscription: Subscription;

  constructor(
    private elem: ElementRef,
    private tagService: TagService,
    private sharedService: ShareNavBarRequestService, private userService: UserService
  ) {
    this.allCategories = {"name": this.DEFAULT_VALUE_DROPDOWN};
    this.tags.push(this.allCategories);
  }

  ngOnInit(): void {
    this.isValid = this.userService.isUserLoggedIn();
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isValid = this.userService.isLoggedIn;
      if (this.isValid) {
        this.isTagsEnded = false;
        this.getTagsByPage(this.page);
      }
    })
  }

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.dropdownOpen) {
      $event.preventDefault();
    } else {
      return;
    }
    if ($event.code === 'ArrowUp') {
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      } else if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if ($event.code === 'ArrowDown') {
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      } else if (this.currentIndex < this.tags.length - 1) {
        this.currentIndex++;
      }
      this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if (($event.code === 'Enter' || $event.code === 'NumpadEnter') && this.currentIndex >= 0) {
      this.selectByIndex(this.currentIndex);
    } else if ($event.code === 'Escape') {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', "false");
    this.currentIndex = -1;
    this.dropdownOpen = false;
  }

  selectByIndex(i: number) {
    let value = this.tags[i];
    this.select(value);
  }

  select(value: Tag) {
    this.sharedService.tagName.next(value.name);
    this.sharedService.sendClientEvent();
    this.currentValue = value;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  toggleDropdown() {
    if (this.isValid) {
      this.elem.nativeElement.querySelector('.dropdown-list').addEventListener('scroll', (e: Event) => {
          let el = this.elem.nativeElement;
          if (el.contains(e.target)) {
            this.onScrollElement();
          }
        }
      );

      this.dropdownOpen = !this.dropdownOpen;
      this
        .dropdownElement
        .setAttribute(
          'aria-expanded'
          ,
          this
            .dropdownOpen ?
            "true" : "false"
        );
    }
  }

  getTagsByPage(page: number) {
    this.tagService.getByPage(page, this.limit).subscribe((tags) => {
      if (tags === undefined || tags["_embedded"] === undefined) {
        this.isTagsEnded = true;
      } else {
        this.tags.push(...tags["_embedded"]["tagRepresentationList"]);
      }
    });
  }


  onScrollElement() {
    if (!this.isTagsEnded) {
      this.getTagsByPage(++this.page);
    }
  }
}
