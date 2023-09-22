import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.scrollService.scrollIntoView(params['section']);
    });
  }
}
