import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { navigationMenu } from 'src/app/constants/portfolio-content';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
})
export class NavigationsComponent implements OnInit {
  private scrollService = inject(ScrollService);
  navigationMenus = navigationMenu;
  activeSection!: Observable<string>;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
