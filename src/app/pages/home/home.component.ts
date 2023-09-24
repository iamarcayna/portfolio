import { Component, inject } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private scrollService = inject(ScrollService);

  onIntersect(status: boolean, section: string) {
    if (status) {
      console.log(section);
      this.scrollService.activeSection.next(section);
    }
  }
}
