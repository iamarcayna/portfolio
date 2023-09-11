import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.scrollService.scrollIntoView(params['section']);
    });
  }
}
