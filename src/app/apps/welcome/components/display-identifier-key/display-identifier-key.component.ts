import { Component, Inject, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProxyTokenReturnType } from '../../welcome.type';
import { DeviceInfoType } from '../../../../../resources/types/device-info.type';
import { ToastService } from '../../../../services/toast/toast.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-display-identifier-key',
  templateUrl: './display-identifier-key.component.html',
  styleUrl: './display-identifier-key.component.scss',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DisplayIdentifierKeyComponent {
  @ViewChild('closeDialogButton') closeDialogButton!: MatButton;

  identifierKey: string = '';
  keySegments: string[] = [];
  remainingTime: number = 30;

  deviceInfo: DeviceInfoType | null = null;
  dialogRef!: DialogRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private toastService: ToastService,
  ) {
    setTimeout(() => {
      window.bridge.getDeviceInfo((data: DeviceInfoType) => {
        this.deviceInfo = data;
        this.dialogRef = this.dialogData.dialog;
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.closeDialogButton.disabled = true;
      const timer = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(timer);
          this.closeDialogButton.disabled = false;
        }
      }, 1000);

      // identifier key
      this.identifierKey = this.dialogData.key;
      this.keySegments = this.identifierKey?.match(/.{1,8}/g) || [];

      // request proxy token
      window.bridge.requestProxyToken(
        this.identifierKey,
        (data: ProxyTokenReturnType) => {
          console.log(data);
          this.toastService.toast({
            message: `"${this.deviceInfo?.hostname}" was accepted by the admin.`,
            config: { duration: 3000, panelClass: 'success-toast' },
          });
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          if (error.message.startsWith('DeviceRequestRejectedError')) {
            this.toastService.toast({
              message: `"${this.deviceInfo?.hostname}" was rejected by the admin.`,
              config: { duration: 5000, panelClass: 'error-toast' },
            });
            this.dialogRef.close();
            this.abortRequest();
          }
        },
      );
    });
  }

  abortRequest() {
    window.bridge.aboartRequestProxyToken(this.identifierKey);
  }
}
