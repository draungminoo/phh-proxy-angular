import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppItemType } from './apps-list.type';
import { AppItemComponent } from './components/app-item/app-item.component';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrl: './apps-list.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [
    // Modules
    MatDialogModule,
    MatProgressSpinnerModule,

    // Components
    FooterComponent,
    AppItemComponent,
  ],
})
export class AppsListComponent {
  loadingDialog = inject(MatDialog);

  appsList: AppItemType[] = [
    {
      name: 'WhatsApp',
      imageUrl: 'https://web.whatsapp.com/favicon.ico',
      url: 'https://www.facebook.com',
    },
  ];

  connectingApp: boolean = false;
  connectingAppUrl: string = '';

  constructor() {
    window.bridge.showAppMenu(true);
  }

  loadUrl(url: string) {
    this.connectingApp = true;
    this.connectingAppUrl = url;
    window.bridge.loadUrl(url);
  }
}
