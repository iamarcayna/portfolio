import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.scrollService.scrollIntoView(params['section']);
    });
  }
}
