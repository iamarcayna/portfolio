import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { navigationMenu } from 'src/app/constants/portfolio-content';
import { ScrollService } from 'src/app/services/scroll.service';

interface SectionStatus {
  intersecting: boolean;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  activeSection!: string;
  sections!: Array<SectionStatus>;
  sectionSubscription!: Subscription;

  ngOnInit(): void {
    this.sectionSubscription = this.scrollService.activeSection.subscribe(
      (section) => {
        this.activeSection = section;
      }
    );
    this.sections = navigationMenu.map((menu) => {
      let curStatus = false;
      if (this.activeSection === menu.url) {
        curStatus = true;
      }
      return { url: menu.url, intersecting: curStatus };
    });
  }
  ngOnDestroy(): void {
    this.sectionSubscription?.unsubscribe();
  }

  onIntersect(intersecting: boolean, curSection: string) {
    this.sections.map((section: SectionStatus) => {
      if (section.url === curSection) {
        section.intersecting = intersecting;
      }
      return section;
    });
    const activeSection = this.hasOneIntersection(this.sections);
    if (activeSection) {
      this.scrollService.activeSection.next(activeSection);
    }
  }

  private hasOneIntersection(sections: Array<SectionStatus>): string | null {
    const intersect: Array<string> = [];
    sections.map((section: SectionStatus) => {
      if (section.intersecting) {
        intersect.push(section.url);
      }
      return section;
    });

    return intersect.length === 1 ? intersect[0] : null;
  }
}
