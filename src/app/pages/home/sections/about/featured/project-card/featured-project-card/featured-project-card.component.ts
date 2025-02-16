import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeaturedProject } from 'src/app/constants/models';

@Component({
  selector: 'app-featured-project-card',
  templateUrl: './featured-project-card.component.html',
})
export class FeaturedProjectCardComponent {
  @Input('project') project!: FeaturedProject;
  @Output('openDetail') openDetail = new EventEmitter<FeaturedProject>();

  loading: boolean = true;

  onLoad() {
    this.loading = false;
  }

  openDetailModal() {
    this.openDetail.emit(this.project);
  }
}
