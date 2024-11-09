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
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const pp = new URLSearchParams(window.location.search);
      console.log(pp); // Output: 'example'

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
      window.location.href = this.error.reloadUrl;
    }
  }
}
