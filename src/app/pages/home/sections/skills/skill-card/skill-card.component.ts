import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
})
export class SkillCardComponent {
  @Input('title') title!: string;
  @Input('icon') icon!: string;
  pingClass: string = '';
  pingActive: boolean = false;
  loading: boolean = true;

  ping() {
    if (this.pingActive) {
      return;
    }
    this.pingActive = true;
    this.pingClass = 'animate-heartbeat';
    setTimeout(() => {
      this.pingActive = false;
      this.pingClass = '';
    }, 1000);
  }

  onLoad() {
    this.loading = false;
  }
}
