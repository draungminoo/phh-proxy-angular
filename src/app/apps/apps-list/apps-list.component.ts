import { ChangeDetectorRef, Component, inject } from '@angular/core';
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

  appsList: AppItemType[] = [];

  connectingApp: boolean = false;
  connectingAppUrl: string = '';

  constructor(private cdr: ChangeDetectorRef) {
    window.bridge.showAppMenu(false);
    window.bridge.checkMinVersionValidity();

    console.log('Getting available websites...');
    window.bridge.getAvailableWebsites(
      (data) => {
        this.appsList = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  loadUrl(url: string) {
    this.connectingApp = true;
    this.connectingAppUrl = url;
    window.bridge.loadUrl(url);
    window.bridge.showAppMenu(true);
    this.cdr.detectChanges();
  }
}
