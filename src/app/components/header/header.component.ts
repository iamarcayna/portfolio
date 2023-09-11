import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<any>();

  fixedNavbar = 'shadow-sm dark:bg-gray-800';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.fixedNavbar = 'shadow-md dark:bg-gray-900';
    } else {
      this.fixedNavbar = 'shadow-sm dark:bg-gray-800';
    }
  }

  toggleDrawer() {
    this.toggle.emit();
  }
}
