import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  navigate(page: string, section: string) {
    this.router.navigate([page]).then((_success) => {
      this.router.navigate([page], {
        queryParams: { section: section },
      });
    });
  }
}
