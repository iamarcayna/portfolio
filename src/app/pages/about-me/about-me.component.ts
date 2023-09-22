import { Component, AfterViewInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.scrollService.scrollIntoView(params['section']);
    });
  }
}
