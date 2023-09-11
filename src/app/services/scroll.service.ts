import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollIntoView(section: string) {
    if (section) {
      const sectionToScroll = document.getElementById(section);
      sectionToScroll?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
