import { HttpInterceptorFn } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);
  const token = session.session()?.token?.token;
  const router = inject(Router);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        session.clearSession();
        router.navigate(['/auth/login']);
      }
      return throwError(() => err);
    })
  );
};
