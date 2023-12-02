import { Component, Input } from '@angular/core';
import { Project } from 'src/app/constants/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input('project') project!: Project;

  loading: boolean = true;

  onLoad() {
    this.loading = false;
  }
}
