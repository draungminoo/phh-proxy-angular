import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ErrorItemType } from './error-page.type';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class ErrorPageComponent {
  error!: ErrorItemType;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
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
      window.location.href = this.error.reloadUrl;
    }
  }
}
