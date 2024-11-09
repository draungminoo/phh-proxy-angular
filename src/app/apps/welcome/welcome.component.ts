import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  constructor() {}
}
