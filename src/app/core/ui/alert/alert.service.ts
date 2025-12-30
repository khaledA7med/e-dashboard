import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirm(opts: {
    title?: string;
    text?: string;
    confirmText?: string;
    cancelText?: string;
    icon?: SweetAlertIcon;
  }) {
    return Swal.fire({
      title: opts.title ?? 'Are you sure?',
      text: opts.text ?? '',
      icon: opts.icon ?? 'warning',
      showCancelButton: true,
      confirmButtonText: opts.confirmText ?? 'Yes',
      cancelButtonText: opts.cancelText ?? 'Cancel',
      reverseButtons: true,
      focusCancel: true,
    });
  }

  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 1800,
      showConfirmButton: false,
    });
  }

  error(title: string, text?: string) {
    return Swal.fire({ icon: 'error', title, text });
  }

  info(title: string, text?: string) {
    return Swal.fire({ icon: 'info', title, text });
  }
}
