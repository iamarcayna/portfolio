import { Component } from '@angular/core';
import { skillset } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skillset = skillset;
}
