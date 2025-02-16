import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ThemeSelectorService } from './services/theme.service';
import { SnackbarService } from './services/snackbar.service';
import { ContainerDirective } from './directives/container.directive';
import AOS from 'aos';
import { ScrollService } from './services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeSelectorService);
  private snackBarService = inject(SnackbarService);
  private scrollService = inject(ScrollService);

  open: boolean = false;
  isModalOpen: boolean = false;
  scrollServiceSubscription: Subscription | undefined;

  @ViewChild(ContainerDirective, { static: true })
  snackbarContainer!: ContainerDirective;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    // tailwind md:screen is 768px
    if ((event.target as Window).innerWidth >= 768) {
      this.open = false;
      if (!this.isModalOpen) {
        document.body.classList.remove('overflow-y-hidden');
        document.body.classList.add('overflow-y-auto');
      }
    }
  }

  ngOnInit(): void {
    AOS.init({
      easing: 'ease-in-out',
      delay: 0,
      offset: 150,
      duration: 400,
      once: true,
    });
    setTimeout(() => {
      AOS.refresh();
    });
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
    } else {
      this.themeService.setTheme('light');
    }
    this.snackBarService.setContainer(this.snackbarContainer);

    this.scrollServiceSubscription = this.scrollService.isModalActive.subscribe(
      (next) => {
        this.isModalOpen = next;
      }
    );
  }

  ngOnDestroy(): void {
    this.scrollServiceSubscription?.unsubscribe();
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
