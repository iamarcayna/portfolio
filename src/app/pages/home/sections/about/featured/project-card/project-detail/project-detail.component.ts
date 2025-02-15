import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  @Input('isOpen') isOpen!: boolean | null;
  @Output() close = new EventEmitter<any>();

  closeModal() {
    this.close.emit();
  }
}
