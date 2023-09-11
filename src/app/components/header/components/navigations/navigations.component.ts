import { Component } from '@angular/core';
import { navigationMenu } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
})
export class NavigationsComponent {
  navigationMenus = navigationMenu;
}
