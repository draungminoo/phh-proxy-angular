import { ComponentType } from '@angular/cdk/portal';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastOptionsType = {
  message: string;
  action?: string;
  config?: MatSnackBarConfig<any>;
};

export type ToastComponentOptionsType = {
  component: ComponentType<any>;
  config?: MatSnackBarConfig<any>;
};
