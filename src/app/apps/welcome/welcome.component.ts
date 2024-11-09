import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [
    // Modules
    MatProgressSpinnerModule,

    // Components
    FooterComponent,
  ],
})
export class WelcomeComponent {
  version: string = '1.0.2';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.version = params['version'];
    });
  }
}
