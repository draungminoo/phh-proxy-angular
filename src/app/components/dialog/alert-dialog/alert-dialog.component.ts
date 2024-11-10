import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface AlertDialogType {
  title: string;
  message: string;
  status?: 'primary' | 'accent' | 'warn';
}

/**
 * Standalone component
 */
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class AlertDialogComponent {
  dialogData: AlertDialogType;

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AlertDialogType,
  ) {
    this.dialogData = this.data;
    this.dialogRef.disableClose = true;
  }
}
