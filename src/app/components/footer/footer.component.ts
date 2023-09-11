import { Component, inject } from '@angular/core';
import {
  contactInfo,
  footerLinks,
  sectionLinks,
} from 'src/app/constants/portfolio-content';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private navigationService = inject(NavigationService);

  footerLinks = footerLinks;
  contactInfo = contactInfo;
  sectionLinks = sectionLinks;

  navigate(page: string, section: string) {
    this.navigationService.navigate(page, section);
  }
}
