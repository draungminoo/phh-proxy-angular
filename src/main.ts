import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

declare global {
  interface Window {
    bridge: any; // Replace `any` with a specific type if you know it
  }
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
