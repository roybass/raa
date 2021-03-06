// in src/authProvider.js
import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, fetchUtils } from 'react-admin';
import modelProvider from './modelprovider';


class AuthProvider {

  constructor(authUrl) {
    this.authUrl = authUrl;
  }

  static provide() {
    const model = modelProvider.getModelSync();
    if (model && model.authentication) {
      return new AuthProvider(model.authentication.url).authenticate;
    }
  }

  authenticate = (type, params) => {
    if (type === AUTH_ERROR && (params.status === 401 || params.status === 403)) {
      console.log("Authentication Error. Redirecting to login page", params);
      return Promise.reject({ redirectTo: "/login" });
    }
    if (type === AUTH_LOGOUT) {
      localStorage.removeItem('token');
      return Promise.resolve();
    }
    if (type === AUTH_LOGIN) {
      const { username, password } = params;
      const request = new Request(this.authUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      return fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(({ token }) => {
          localStorage.setItem('token', token);
        });
    }
    return Promise.resolve();
  };


  static getHttpClient() {
    return (url, options = {}) => {
      if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
      }
      const token = localStorage.getItem('token');
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
      }
      return fetchUtils.fetchJson(url, options).then(AuthProvider._handleContentRangeHeader);
    }
  }

  static _handleContentRangeHeader(response) {
    if (response.headers.has('content-range')) {
      return response;
    }
    if (!Array.isArray(response.json)) {
      console.log(typeof response.json);
      return response;
    }
    const total = response.json.length;

    const headers = new Headers();
    for (let pair of response.headers.entries()) {
      headers.append(pair[0], pair[1]);
    }
    headers.set('content-range', '1,' + total + '/' + total);
    response.headers = headers;
    return response;

  }
}

export default AuthProvider;
