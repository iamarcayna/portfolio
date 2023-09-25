import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  activeSection: BehaviorSubject<string> = new BehaviorSubject('hero');

  scrollIntoView(section: string) {
    const sectionToScroll = document.getElementById(section);
    sectionToScroll?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
