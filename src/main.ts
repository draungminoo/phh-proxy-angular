import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ElectronPreloadType } from './resources/types/preload.type';

declare global {
  interface Window {
    bridge: ElectronPreloadType; // Replace `any` with a specific type if you know it
  }
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
