import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ThemeSelectorService } from './services/theme.service';
import { SnackbarService } from './services/snackbar.service';
import { ContainerDirective } from './directives/container.directive';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeSelectorService);
  private snackBarService = inject(SnackbarService);
  open: boolean = false;

  @ViewChild(ContainerDirective, { static: true })
  snackbarContainer!: ContainerDirective;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    // tailwind md:screen is 768px
    if ((event.target as Window).innerWidth >= 768) {
      this.open = false;
      document.body.classList.remove('overflow-y-hidden');
      document.body.classList.add('overflow-y-auto');
    }
  }

  ngOnInit(): void {
    AOS.init({
      easing: 'ease-in-out-cubic',
      delay: 50,
      offset: 250,
      duration: 1000,
      once: true,
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 100, // the delay on throttle used while scrolling the page (advanced)
    });
    setTimeout(() => {
      AOS.refresh();
    });
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
    } else {
      this.themeService.setTheme('dark');
    }
    this.snackBarService.setContainer(this.snackbarContainer);
  }

  drawerOpen() {
    this.open = true;
    document.body.classList.remove('overflow-y-auto');
    document.body.classList.add('overflow-y-hidden');
  }

  drawerClose() {
    this.open = false;
    document.body.classList.remove('overflow-y-hidden');
    document.body.classList.add('overflow-y-auto');
  }
}
