import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<any>();

  fixedNavbar = 'shadow-sm dark:bg-gray-800 fixed top-0 left-0';
  prevScrollPos = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let curScroll = window.scrollY;

    if (curScroll > this.prevScrollPos) {
      // scrolling down
      this.fixedNavbar = 'hidden';
    } else {
      // scrolling up
      if (curScroll > 100) {
        this.fixedNavbar = 'shadow-md dark:bg-gray-900 fixed top-0 left-0';
      } else {
        this.fixedNavbar = 'shadow-sm dark:bg-gray-800 fixed top-0 left-0';
      }
    }
    this.prevScrollPos = curScroll;
  }

  toggleDrawer() {
    this.toggle.emit();
  }
}
