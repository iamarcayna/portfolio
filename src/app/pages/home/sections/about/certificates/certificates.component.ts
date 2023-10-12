import { Component, Input } from '@angular/core';
import { Certificate } from 'src/app/constants/models';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent {
  @Input('certificates') certificates!: Array<Certificate>;
}
