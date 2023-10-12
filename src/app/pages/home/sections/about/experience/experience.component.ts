import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/constants/models';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  @Input('experiences') experiences!: Array<Experience>;
}
