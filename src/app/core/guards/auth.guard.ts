import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateChildFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.isLoggedIn()) return true;

  router.navigate(['/auth/login']);
  return false;
};
