import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

@Injectable({
  providedIn: 'root',
})
export class SweetToastService {
  show(icon: SweetAlertIcon, title: string) {
    return Toast.fire({ icon, title });
  }
  success(msg: string) {
    return this.show('success', msg);
  }
  error(msg: string) {
    return this.show('error', msg);
  }
  info(msg: string) {
    return this.show('info', msg);
  }
  warning(msg: string) {
    return this.show('warning', msg);
  }
}
