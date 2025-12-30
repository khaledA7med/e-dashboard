import {
  AuthUser,
  AuthTokens,
} from '../../features/auth/data-access/store/auth.models';

export interface Session {
  user: AuthUser | null;
  token: AuthTokens | null;
}
