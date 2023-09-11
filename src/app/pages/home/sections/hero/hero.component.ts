import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit {
  private navigationService = inject(NavigationService);
  @ViewChild('profession') profession!: any;

  ngAfterViewInit(): void {
    const writer = new Typewriter(this.profession.nativeElement, {
      loop: true,
      typeColor: 'transparent',
      cursorColor: 'transparent',
    });

    writer
      .type('Full-stack Developer.')
      .rest(2500)
      .remove(21)
      .rest(1000)
      .type('Angular Developer.')
      .rest(2500)
      .remove(18)
      .rest(1000)
      .type('Laravel Developer.')
      .rest(2500)
      .start();
  }

  navigate(page: string, section: string) {
    this.navigationService.navigate(page, section);
  }
}
