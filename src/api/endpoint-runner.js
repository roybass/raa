import mustache from 'mustache';
/**
 * Takes an endpoint configuration and data and processes it, returning a future of the result.
 */
class EndpointRunner {


  run(endpoint, params) {
    if (endpoint === null || endpoint === undefined) {
      throw new Error('No endpoint defined');
    }

    const url = this.buildUrl(endpoint, params);
    const body = this.buildBody(endpoint, params);
    const headers = this.getHeaders(endpoint, params);
    const method = endpoint.method || "GET";

    const request = new Request(url, {
      method,
      body,
      headers
    });
    console.log('Request: ', request);
    return fetch(request);
  }

  buildUrl(endpoint, params) {
    if (!endpoint.url) {
      throw new Error('Endpoint URL is missing', JSON.stringify(endpoint));
    }
    return mustache.render(endpoint.url, params);
  }

  buildBody(endpoint, params) {
    if (!endpoint.body) {
      return;
    }
    return mustache.render(endpoint.body, params);
  }

  getHeaders(endpoint, params) {
    const headers = new Headers();
    headers.set('accept', 'application/json');
    if (endpoint.method && endpoint.method.toLowerCase() !== 'get') {
      headers.set('Content-Type', 'application/json');
    }
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (endpoint.headers) {
      for (let header in endpoint.headers) {
        if (!endpoint.headers.hasOwnProperty(header)) {
          continue;
        }
        if (header === 'key') {
          continue; // Ignore the custom key values which are artificailly added
        }
        headers.set(header, mustache.render(endpoint.headers[header], params));
      }
    }
    return headers;
  }
}

export default new EndpointRunner();
