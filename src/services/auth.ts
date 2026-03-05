import type { Token } from '../types/auth.ts';

class Auth {
  private _accessToken: string;
  private _refreshToken: string;

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
