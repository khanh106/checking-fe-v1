import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

export function setAuthTokens({
  token,
  refreshToken,
}: {
  token: string | null;
  refreshToken: string | null;
}) {
  if (token) {
    Cookies.set(TOKEN_KEY, token, { expires: 7 });
  }
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 30 });
  }
}

export function getAuthToken() {
  return Cookies.get(TOKEN_KEY);
}

export function clearAuthTokens() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export function isAdmin() {
  return false;
}

export function isStaff() {
  return false;
}