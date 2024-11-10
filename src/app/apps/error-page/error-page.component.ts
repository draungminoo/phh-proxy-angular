import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { onComponentDestroy } from '../../../resources/tools/on-destroy.task';
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
  error!: ErrorItemType;
  connectingPage: boolean = false;

  private onDestroy = onComponentDestroy();

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        console.log(params);
        try {
          const obj: any = JSON.parse(params['query']);
          console.log(obj);

          this.error = obj;
        } catch (error) {
          console.log(error);
        }
      });
  }

  refreshPage() {
    if (this.error.reloadUrl == '-') {
      window.bridge?.loadProxyConfiguration();
    } else {
      this.connectingPage = true;
      window.location.href = this.error.reloadUrl;
    }
  }
}
