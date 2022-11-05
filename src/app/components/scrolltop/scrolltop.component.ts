// import {Component, HostListener, Inject, OnInit} from '@angular/core';
// import {DOCUMENT, ViewportScroller} from "@angular/common";
//
// @Component({
//   selector: 'app-scrolltop',
//   templateUrl: './scrolltop.component.html',
//   styleUrls: ['./scrolltop.component.scss']
// })
// export class ScrolltopComponent implements OnInit {
//   viewport: ViewportScroller;
//   windowScrolled: boolean;
//
//   constructor(
//     @Inject(DOCUMENT) private document: Document) {
//   };
//
//   ngOnInit(): void {
//   };
//
//
//   @HostListener("window:scroll", [])
//   onWindowScroll() {
//     if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
//       this.windowScrolled = true;
//     } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
//       this.windowScrolled = false;
//     }
//   }
//
//   scrollToTop() {
//     (function smoothScroll() {
//       let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
//       if (currentScroll > 0) {
//         window.requestAnimationFrame(smoothScroll);
//         window.scrollTo(0, currentScroll - (currentScroll / 8));
//       }
//     })();
//   }
// }
