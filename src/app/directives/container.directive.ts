import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[snackbarContainer]',
})
export class SnackbarContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
