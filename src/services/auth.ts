import type { Token } from '../types/auth.ts';
import { Roles } from '../types/admin.ts';
import { decodeJwt } from 'jose';

class Auth {
  private _accessToken: string;
  private _refreshToken: string;
  private _roles: Roles[] = [];

  constructor() {
    this._refreshToken = localStorage.getItem('refreshToken') || '';
    this._accessToken = '';
  }

  clearTokens() {
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.removeItem('refreshToken');
  }

  authorize({ accessToken, refreshToken }: Token) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;

    const { isAdmin: roles } = decodeJwt<{ isAdmin: Roles[] }>(this.accessToken);

    this._roles = roles;
  }

  get isAdmin() {
    return this._roles.includes(Roles.ADMIN || Roles.MODERATOR);
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
    localStorage.setItem('refreshToken', value);
  }
}

const AuthService = new Auth();

export default AuthService;
