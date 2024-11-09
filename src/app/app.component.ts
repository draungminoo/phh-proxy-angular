import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'PHH Proxy';
}
