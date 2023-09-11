import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
})
export class BackToTopComponent implements OnInit {
  private scrollService = inject(ScrollService);
  buttonClass = 'hidden';
  scrolling = false;
  scrollPosition!: number;
  classTimeout!: any;
  scrollingTimeout!: any;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY;
    this.scrolling = true;
    if (this.classTimeout) {
      clearTimeout(this.classTimeout);
    }
    if (this.scrollingTimeout) {
      clearTimeout(this.scrollingTimeout);
    }
    if (this.scrollPosition >= 200) {
      this.classTimeout = setTimeout(() => {
        this.buttonClass = 'hidden';
      }, 2000);
      this.scrollingTimeout = setTimeout(() => {
        this.scrolling = false;
      }, 200);
      this.buttonClass = 'block';
    } else {
      this.buttonClass = 'hidden';
    }
  }

  ngOnInit(): void {
    this.scrollPosition = window.scrollY;
  }
  backToTop() {
    this.scrollService.scrollToTop();
  }
}
