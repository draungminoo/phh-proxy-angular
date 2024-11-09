import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppItemType } from './apps-list.type';
import { AppItemComponent } from './components/app-item/app-item.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrl: './apps-list.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [
    // Modules
    MatDialogModule,

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
      url: 'https://web.whatsapp.com',
    },
  ];

  constructor() {}

  loadUrl(url: string) {
    const dialog = this.loadingDialog.open(LoadingComponent, {
      panelClass: 'loading-dialog',
    });
    dialog.disableClose = true;

    setTimeout(() => {
      window.location.href = url;
      dialog.close();
    }, 1000);
  }
}
