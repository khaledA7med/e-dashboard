import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export function provideSessionInitializer() {
  return () => {
    const session = inject(SessionService);
    session.restoreSession();
  };
}
