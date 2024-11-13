import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

    // Components
    FooterComponent,
    AppItemComponent,
  ],
})
export class AppsListComponent {
  @ViewChild('appMenuTrigger') appMenuTrigger!: MatMenuTrigger;

  loadingDialog = inject(MatDialog);

  appsList: AppItemType[] = [];

  // loading
  isLoading: boolean = false;
  loadingMessage: string = '';

  connectingAppUrl: string = '';

  windowId: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.windowId = window.bridge.getWindowId();

    window.bridge.showAppMenu(this.windowId, false);
    window.bridge.checkMinVersionValidity(this.windowId);

    // refersh app list
    this.refreshAppList();
  }

  refreshAppList() {
    this.isLoading = true;
    this.loadingMessage = `Refreshing app list...`;

    setTimeout(() => {
      console.log('Getting available websites...');
      window.bridge.getAvailableWebsites(
        this.windowId,
        (data) => {
          this.appsList = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      );
    }, 1000);
  }

  loadAppUrl(url: string) {
    this.isLoading = true;
    this.loadingMessage = `Connection to ${url}`;
    this.connectingAppUrl = url;
    window.bridge.loadUrl(this.windowId, url);

    window.bridge.showAppMenu(this.windowId, true);
    this.cdr.detectChanges();
  }
}
