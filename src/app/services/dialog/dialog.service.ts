import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  AlertDialogComponent,
  AlertDialogType,
} from '../../components/dialog/alert-dialog/alert-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogType,
} from '../../components/dialog/confirm-dialog/confirm-dialog.component';
import {
  PormptDialogComponent,
  PromptDialogType,
} from '../../components/dialog/prompt-dialog/prompt-dialog.component';

/**
 * This is dialog service.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  /**
   * Get mat dialog ref.
   * @returns matDialog
   */
  getMatDialog() {
    return this.matDialog;
  }

  /**
   * Alert dialog
   * @param data : { message, title }
   */
  alert(
    data: AlertDialogType = {
      message: 'Alert dialog',
      title: 'Alert',
    },
    config?: MatDialogConfig,
  ) {
    return this.matDialog.open(AlertDialogComponent, {
      ...config,
      data: {
        ...data,
        ...config?.data,
      },
    });
  }

  /**
   * Confirm dialog
   * @param data { message, title }
   * @returns dialog id
   */
  confirm(
    data: ConfirmDialogType = {
      message: 'Confirm dialog',
      title: 'Confirm',
    },
    config?: MatDialogConfig,
  ) {
    return this.matDialog.open(ConfirmDialogComponent, {
      ...config,
      data: {
        ...data,
        ...config?.data,
      },
    });
  }

  /**
   * Prompt dialog
   * @param data { message, title }
   * @returns dialog id
   */
  prompt(
    data: PromptDialogType = {
      title: 'Prompt',
    },
    config?: MatDialogConfig,
  ) {
    return this.matDialog.open(PormptDialogComponent, {
      ...config,
      data: {
        ...data,
        ...config?.data,
      },
    });
  }

  /**
   * Custom dialog
   * @param component any component
   * @param data any
   * @returns dialog id
   */
  customDialog(component: ComponentType<any>, config?: MatDialogConfig) {
    return this.matDialog.open(component, config);
  }

  /**
   * Close all dialogs.
   */
  closeAll() {
    this.matDialog.closeAll();
  }

  /**
   * Close dialog by id.
   * @param dialogId
   */
  closeById(dialogId: string) {
    const dialogRef = this.matDialog.openDialogs.find(
      (dialog) => dialog.id == dialogId,
    );
    if (dialogRef) dialogRef.close();
  }
}
