import { Component } from '@angular/core';
import { Experience } from 'src/app/constants/models';
import { aboutMe } from 'src/app/constants/portfolio-content';

interface AboutMe {
  about_first: string;
  about_second: string;
  hobbies: Array<string>;
  experiences: Array<Experience>;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  aboutMe: AboutMe = aboutMe;
}
