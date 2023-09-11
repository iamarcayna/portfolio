import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeSelectorService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeSelectorService);

  theme!: string;
  themeSubs!: Subscription;

  ngOnInit(): void {
    this.themeSubs = this.themeService.theme.subscribe((_theme) => {
      this.theme = _theme;
    });
  }

  ngOnDestroy(): void {
    this.themeSubs?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.setTheme();
  }
}
