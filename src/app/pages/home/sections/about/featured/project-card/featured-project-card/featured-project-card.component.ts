import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeaturedProject } from 'src/app/constants/models';

@Component({
  selector: 'app-featured-project-card',
  templateUrl: './featured-project-card.component.html',
})
export class FeaturedProjectCardComponent {
  @Input('project') project!: FeaturedProject;

  loading: boolean = true;
  isModalOpen = new BehaviorSubject<boolean>(false);

  onLoad() {
    this.loading = false;
  }

  openDetailModal() {
    this.isModalOpen.next(true);
    document.body.classList.remove('overflow-y-auto');
    document.body.classList.add('overflow-y-hidden');
  }

  closeDetailModal() {
    this.isModalOpen.next(false);
    document.body.classList.remove('overflow-y-hidden');
    document.body.classList.add('overflow-y-auto');
  }
}
