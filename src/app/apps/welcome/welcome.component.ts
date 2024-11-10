import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppStorageKeyEnums } from '../../../resources/enums/app-storage-key.enum';
import { FooterComponent } from '../../components/footer/footer.component';
import { CryptoJsService } from '../../services/cryptojs/cryptojs.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ProxyTokenReturnType } from './welcome.type';
import { DisplayIdentifierKeyComponent } from './components/display-identifier-key/display-identifier-key.component';

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
  }

  checkLocalToken() {
    this.isLoading = true;
    this.message = 'Checking local token...';

    setTimeout(() => {
      window.bridge.getItem(
        AppStorageKeyEnums.LOCAL_PROXY_TOKEN,
        (token) => {
          console.log(token);
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
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log(data);
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    );
  }
}
