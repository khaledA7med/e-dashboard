import { Injectable, signal } from '@angular/core';
import { Session } from '../models/session.model';

const SESSION_KEY = 'e_dashboard_session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _session = signal<Session | null>(null);

  readonly session = this._session.asReadonly();

  readonly isLoggedIn = () => !!this._session()?.token?.token;

  setSession(session: Session): void {
    this._session.set(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  clearSession(): void {
    this._session.set(null);
    localStorage.removeItem(SESSION_KEY);
  }

  restoreSession(): void {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;

    try {
      const session = JSON.parse(raw) as Session;
      this._session.set(session);
    } catch {
      this.clearSession();
    }
  }
}
