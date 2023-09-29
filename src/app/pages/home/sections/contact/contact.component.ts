import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  private snackBarService = inject(SnackbarService);
  contactForm!: FormGroup;
  formSubmited: boolean = false;
  sendingMessage: boolean = false;
  submitTimeout: any;
  sendingTimeout: any;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  sendMessage() {
    if (this.submitTimeout) {
      clearTimeout(this.submitTimeout);
    }
    this.formSubmited = true;
    this.submitTimeout = setTimeout(() => {
      this.formSubmited = false;
    }, 60_000);

    if (this.contactForm.invalid || this.sendingMessage) {
      return;
    }
    // temporary code for sending message
    // TODO: Change this after finding email service
    if (this.sendingTimeout) {
      clearTimeout(this.sendingTimeout);
    }
    this.sendingMessage = true;
    this.sendingTimeout = setTimeout(() => {
      this.sendingMessage = false;
      this.snackBarService.showSnackbar({
        message: 'Message sent successfully.',
      });
    }, 1_000);
    this.contactForm.reset();
    this.formSubmited = false;
  }

  copyEmail() {
    const email = document.getElementById('email_address_copy');
    if (email?.innerText) {
      navigator.clipboard.writeText(email.innerHTML);
      this.snackBarService.showSnackbar({
        message: 'Copied to clipboard.',
      });
    }
  }
}
