import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit {
  private scrollService = inject(ScrollService);
  @ViewChild('profession') profession!: any;

  private headings = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
  ]

  ngAfterViewInit(): void {
    const writer = new Typewriter(this.profession.nativeElement, {
      loop: true,
      typeColor: 'transparent',
      cursorColor: 'transparent',
    });

    this.headings.forEach(h => {
      writer
      .type(h)
      .rest(2500)
      .remove(h.length)
      .rest(1000)
    })

    writer.start();
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
