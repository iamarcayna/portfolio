import { Component, Input } from '@angular/core';
import { FeaturedProject } from 'src/app/constants/models';

@Component({
  selector: 'app-featured-project-card',
  templateUrl: './featured-project-card.component.html',
})
export class FeaturedProjectCardComponent {
  @Input('project') project!: FeaturedProject;

  loading: boolean = true;

  onLoad() {
    this.loading = false;
  }
}
