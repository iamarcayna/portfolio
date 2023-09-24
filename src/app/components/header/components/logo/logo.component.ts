import { Component, inject } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  private scrollService = inject(ScrollService);

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
