import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface ConfirmDialogType {
  title: string;
  message: string;

  okText?: string;
  okAction?: VoidFunction;

  cancelText?: string;
  cancelAction?: VoidFunction;

  neutralText?: string;
  neutralAction?: VoidFunction;
}

/**
 * Standalone component
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  dialogData: ConfirmDialogType;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogType,
  ) {
    this.dialogData = this.data;
    this.dialogRef.disableClose = true;
  }

  closeConfirmDialog() {
    this.dialogRef.close();
  }
}
