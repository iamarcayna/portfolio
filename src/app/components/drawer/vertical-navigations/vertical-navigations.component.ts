import { Component, EventEmitter, Output } from '@angular/core';
import { navigationMenu } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-vertical-navigations',
  templateUrl: './vertical-navigations.component.html',
})
export class VerticalNavigationsComponent {
  @Output() close = new EventEmitter<any>();
  navigationMenus = navigationMenu;

  closeDrawer() {
    this.close.emit();
  }
}
