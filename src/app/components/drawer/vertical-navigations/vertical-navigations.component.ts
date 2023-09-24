import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { navigationMenu } from 'src/app/constants/portfolio-content';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-vertical-navigations',
  templateUrl: './vertical-navigations.component.html',
})
export class VerticalNavigationsComponent implements OnInit {
  private scrollService = inject(ScrollService);
  @Output() close = new EventEmitter<any>();
  navigationMenus = navigationMenu;
  activeSection!: Observable<string>;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
    this.close.emit();
  }
}
