import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectResetEmail } from '../../features/auth/data-access/store/auth.selectors';

export const otpGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  let allowed = false;

  store
    .select(selectResetEmail)
    .subscribe((email) => {
      allowed = !!email;
    })
    .unsubscribe();

  if (!allowed) {
    router.navigate(['/auth/forgot-password']);
    return false;
  }

  return true;
};
