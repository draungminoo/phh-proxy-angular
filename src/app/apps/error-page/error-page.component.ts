import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  error: ErrorItemType = {
    name: 'Error',
    description: 'Something went wrong',
    validatedUrl: 'https://punhlainghospitals.com',
  };

  version: string = '';

  constructor() {}

  refreshPage() {}
}
