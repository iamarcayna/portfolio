import { Component } from '@angular/core';
import { projects } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects = projects;
}
