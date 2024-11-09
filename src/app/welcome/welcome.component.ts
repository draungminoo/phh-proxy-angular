import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class WelcomeComponent {
  version: string = '1.0.2';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.version = params['version'];
    });
  }
}
