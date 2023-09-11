import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
})
export class SkillCardComponent {
  @Input('title') title!: string;
  @Input('icon') icon!: string;
  pingClass: string = '';

  ping() {
    this.pingClass = 'animate-heartbeat';
    setTimeout(() => {
      this.pingClass = '';
    }, 1000);
  }
}
