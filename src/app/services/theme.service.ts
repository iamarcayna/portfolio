import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSelectorService {
  theme = new BehaviorSubject<string>('light');

  setTheme(theme?: string) {
    if (theme) {
      document.documentElement.classList.add(theme);
      this.theme.next(theme);
    } else {
      const newTheme = this.theme.value === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove(this.theme.value);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      this.theme.next(newTheme);
    }
  }

  getTheme() {
    return localStorage.getItem('theme');
  }
}
