import { Component, Inject, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProxyTokenReturnType } from '../../welcome.type';
import { DeviceInfoType } from '../../../../../resources/types/device-info.type';

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
  remainingTime: number = 10;

  deviceInfo: DeviceInfoType | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any) {}

  ngAfterViewInit() {
    setTimeout(() => {
      window.bridge.getDeviceInfo((data: DeviceInfoType) => {
        this.deviceInfo = data;
        console.log(this.deviceInfo);
      });

      this.identifierKey = this.dialogData.key;
      this.closeDialogButton.disabled = true;

      this.keySegments = this.identifierKey?.match(/.{1,8}/g) || [];

      const timer = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(timer);
          this.closeDialogButton.disabled = false;
        }
      }, 1000);

      // request proxy token
      window.bridge.requestProxyToken(
        this.identifierKey,
        (data: ProxyTokenReturnType) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        },
      );
    });
  }

  abortRequest() {
    window.bridge.aboartRequestProxyToken(this.identifierKey);
  }
}
