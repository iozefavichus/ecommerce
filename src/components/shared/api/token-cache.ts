import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(newCache: TokenStore) {
    this.myCache = newCache;
  }

  get() {
    return this.myCache;
  }
}

export const anonTokenCache = new MyTokenCache();
export const authTokenCache = new MyTokenCache();
