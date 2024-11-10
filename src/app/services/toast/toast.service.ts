import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponentOptionsType, ToastOptionsType } from './toast.type';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastElem: MatSnackBar) {}

  toast(options: ToastOptionsType) {
    return this.toastElem.open(options.message, options.action, options.config);
  }

  toastComponent(options: ToastComponentOptionsType) {
    return this.toastElem.openFromComponent(options.component, options.config);
  }
}
