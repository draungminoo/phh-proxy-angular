import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AppStorageKeyEnums } from '../../../resources/enums/app-storage-key.enum';
import { ErrorItemType } from './error-page.type';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class ErrorPageComponent {
  error: ErrorItemType | null = null;
  connectingPage: boolean = false;
  loadingMessage: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    window.bridge.getPageData('error', (data) => {
      console.log(data);
      this.error = data as any;
      this.cdr.detectChanges();
    });
  }

  refreshPage() {
    this.connectingPage = true;

    if (!this.error || this.error.reloadUrl == '-') {
      this.loadingMessage = 'Reloading...';
      window.bridge.getItem(
        AppStorageKeyEnums.LOCAL_PROXY_TOKEN,
        (token) => {
          window.bridge?.loadProxyConfiguration(token);
        },
        (error) => {
          console.log(error);
          this.router.navigate(['welcome']);
        },
      );
    } else {
      this.loadingMessage = `Reconnecting to ${this.error?.validatedURL}`;
      window.location.href = this.error?.reloadUrl ?? '';
    }
  }
}
