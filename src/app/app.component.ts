import {
  Component,
  ComponentRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ThemeSelectorService } from './services/theme.service';
import { SnackbarService } from './services/snackbar.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarContainerDirective } from './directives/container.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeSelectorService);
  private snackBarService = inject(SnackbarService);
  open: boolean = false;

  @ViewChild(SnackbarContainerDirective, { static: true })
  snackbarContainer!: SnackbarContainerDirective;
  snackbarRef!: ComponentRef<SnackbarComponent>;

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
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
    }
    this.snackBarService.showSnackbar.subscribe((show) => {
      if (show) {
        this.showSnackbar();
      }
    });
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

  showSnackbar() {
    this.snackbarRef =
      this.snackbarContainer.viewContainerRef.createComponent<SnackbarComponent>(
        SnackbarComponent
      );
    this.snackbarRef.instance.message = 'Message sent successfully.';
    this.snackbarRef.instance.onClose.subscribe((close) => {
      if (close) {
        this.snackbarRef.destroy();
        this.snackBarService.showSnackbar.next(false);
      }
    });
  }
}
