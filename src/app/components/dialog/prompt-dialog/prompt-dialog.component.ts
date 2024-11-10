import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type PromptDialogValidatorType = {
  validator: ValidatorFn;
  errorObj?: Record<string, string>;
};

export interface PromptDialogType {
  title: string;
  placeholder?: string;
  value?: string;
  desc?: string;
  multiLine?: boolean;
  formControl?: FormControl;
  validators?: PromptDialogValidatorType[];

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
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class PormptDialogComponent {
  dialogData: PromptDialogType;
  promptFormControl!: FormControl;

  private validators: ValidatorFn[] = [];
  private errorsInfo: Record<string, string> = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PromptDialogType,
    private dialogRef: MatDialogRef<PormptDialogComponent>,
  ) {
    this.dialogData = this.data;
    this.dialogRef.disableClose = true;

    this.dialogData.validators?.forEach((v) => {
      this.validators.push(v.validator);
      this.errorsInfo = Object.assign(this.errorsInfo, v.errorObj);
    });

    this.promptFormControl = new FormControl(
      this.dialogData.value ?? '',
      this.validators,
    );
    this.dialogData.formControl = this.promptFormControl;
  }

  formErrors() {
    const formErrors = this.promptFormControl.errors;
    const errorMsgs = [];
    if (formErrors) {
      for (const [errorName, value] of Object.entries(formErrors)) {
        if (value) {
          errorMsgs.push(
            this.errorsInfo[errorName] || this.errorsInfo['message'],
          );
        }
      }
    }

    return errorMsgs;
  }

  close() {
    this.dialogRef.close();
  }
}
