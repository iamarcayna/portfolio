import { Component, Input } from '@angular/core';
import { SkillSet } from 'src/app/constants/models';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
})
export class SkillContainerComponent {
  @Input('skills') skills!: SkillSet;
}
