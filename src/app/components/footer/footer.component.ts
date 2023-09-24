import { Component, inject } from '@angular/core';
import {
  contactInfo,
  footerLinks,
  sectionLinks,
} from 'src/app/constants/portfolio-content';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private scrollService = inject(ScrollService);

  footerLinks = footerLinks;
  contactInfo = contactInfo;
  sectionLinks = sectionLinks;

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
