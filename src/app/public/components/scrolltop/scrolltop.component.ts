import {Component, HostListener, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DOCUMENT, ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-scrolltop',
  templateUrl: './scrolltop.component.html',
  styleUrls: ['./scrolltop.component.scss'], encapsulation: ViewEncapsulation.None
})
export class ScrolltopComponent implements OnInit {
  viewport: ViewportScroller;
  windowScrolled: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document) {
  };

  ngOnInit(): void {
  };


  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
}
