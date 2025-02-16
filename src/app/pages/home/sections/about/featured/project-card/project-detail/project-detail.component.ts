import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeaturedProject } from 'src/app/constants/models';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  @Input('isOpen') isOpen!: boolean | null;
  @Input('selectedProject') selectedProject!: FeaturedProject | undefined;
  @Output() close = new EventEmitter<void>();

  selectedThumbnail: string | undefined;

  closeModal() {
    this.close.emit();
  }

  setSelectedThumbnail(path: string) {
    this.selectedThumbnail = path;
  }
}
