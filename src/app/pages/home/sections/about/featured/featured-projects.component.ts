import { Component } from '@angular/core';
import {
  Certificate,
  Experience,
  FeaturedProject,
} from 'src/app/constants/models';
import { aboutMe } from 'src/app/constants/portfolio-content';

interface AboutMe {
  featuredHeader: string;
  about_first: string;
  about_second: string;
  hobbies: Array<string>;
  experiences: Array<Experience>;
  certificates: Array<Certificate>;
  featuredProjects: Array<FeaturedProject>;
}

@Component({
  selector: 'app-featured-projects',
  templateUrl: './featured-projects.component.html',
})
export class FeaturedProjectsComponent {
  aboutMe: AboutMe = aboutMe;
}
