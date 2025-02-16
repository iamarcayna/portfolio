import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
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
  loading = true;

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.close.emit();
  }

  onLoad() {
    this.loading = false;
  }

  closeModal() {
    this.close.emit();
  }

  setSelectedThumbnail(path: string) {
    this.selectedThumbnail = path;
  }
}
