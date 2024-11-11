import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppStorageKeyEnums } from '../../../resources/enums/app-storage-key.enum';
import { FooterComponent } from '../../components/footer/footer.component';
import { CryptoJsService } from '../../services/cryptojs/cryptojs.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { DisplayIdentifierKeyComponent } from './components/display-identifier-key/display-identifier-key.component';
import { ProxyTokenReturnType } from './welcome.type';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [
    // Modules
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,

    // Components
    FooterComponent,
  ],
})
export class WelcomeComponent {
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private cryptoJsService: CryptoJsService,
    private dialogService: DialogService,
  ) {
    this.checkLocalToken();
    window.bridge.showAppMenu(false);
    window.bridge.checkMinVersionValidity();
  }

  checkLocalToken() {
    this.isLoading = true;
    this.message = 'Checking local token...';

    setTimeout(() => {
      window.bridge.getItem(
        AppStorageKeyEnums.LOCAL_PROXY_TOKEN,
        (token) => {
          this.proceedWithToken(token);
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      );
    }, 1000);
  }

  requestProxyToken() {
    this.getDeviceIdentiferKey();
  }

  private getDeviceIdentiferKey() {
    this.isLoading = true;
    this.message = 'Requesting token...';

    window.bridge.getItem(
      AppStorageKeyEnums.LOCAL_IDENTIFIER_KEY,
      (identifierKey) => {
        if (identifierKey) {
          // request proxy token
          this.requestProxyTokenFromServer(identifierKey);
        }
      },
      (error) => {
        console.error(error);
        this.createDeviceIdentifierKey();
      },
    );
  }

  private createDeviceIdentifierKey() {
    const identifierKey = this.cryptoJsService.randomHexString(32);
    window.bridge.setItem(
      {
        key: AppStorageKeyEnums.LOCAL_IDENTIFIER_KEY,
        data: identifierKey,
      },
      () => {
        this.getDeviceIdentiferKey();
      },
      () => {
        this.createDeviceIdentifierKey();
      },
    );
  }

  private requestProxyTokenFromServer(identifierKey: string) {
    // display identifier key
    const dialog = this.dialogService.customDialog(
      DisplayIdentifierKeyComponent,
      {
        data: {
          key: identifierKey,
          get dialog() {
            return dialog;
          },
        },
      },
    );
    dialog.disableClose = true;
    dialog.afterClosed().subscribe(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });

    // request proxy token
    window.bridge.requestProxyToken(
      identifierKey,
      (data: ProxyTokenReturnType) => {
        // save token
        window.bridge.setItem({
          key: AppStorageKeyEnums.LOCAL_PROXY_TOKEN,
          data: data.token,
        });

        // proceed with token
        this.proceedWithToken(data.token);
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    );
  }

  private proceedWithToken(token: string) {
    window.bridge.loadProxyConfiguration(token);
  }
}
