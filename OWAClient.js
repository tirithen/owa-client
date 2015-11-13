require('babel-polyfill');
import config from './config';
import merge from 'merge-objects';
import supplant from 'simple_supplant';
import http from 'superagent';
//import http from 'request';

export default class OWAClient {
  constructor(config) {
    this.config = config || {};
    this.addRequestMethods(config.requests);
  }

  supplant(input, data) {
    let wasObject = input instanceof Object;

    if (wasObject) {
      input = JSON.stringify(input);
    }

    let output = supplant(data, input);

    if (wasObject) {
      output = JSON.parse(output.replace(/\\/g, '\\\\'));
    }

    return output;
  }

  makeRequest(requestParameters, parameters) {
    let resolvePromise;
    let rejectPromise;
    let promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    // Populate the parameters
    parameters = this.supplant(requestParameters, parameters);

    // Set the method and URL
    let method = (parameters.method || 'get').toLowerCase();
    method = method === 'delete' ? 'del' : method;
    let request = http[method](parameters.url);

    // Set the body
    request.send(parameters.data)

    // Set the headers
    Object.keys(parameters.headers).forEach((name) => {
      request.set(name, parameters.headers[name]);
    });

    // Perform request
    request.end((error, response) => {
      if (error) {
        rejectPromise(error);
      } else if (requestParameters.parser instanceof Function) {
        try {
          let data = requestParameters.parser(response);
          resolvePromise(data);
        } catch (exception) {
          resolvePromise(exception);
        }
      } else {
        resolvePromise(response.data);
      }
    });

    /*http(
      {
        url: parameters.url,
        headers: parameters.headers,
        method: method,
        form: parameters.data
      },
      (error, response, body) => {
        if (error) {
          rejectPromise(error);
        } else if (requestParameters.parser instanceof Function) {
          try {
            let data = requestParameters.parser(response, body);
            resolvePromise(data);
          } catch (exception) {
            resolvePromise(exception);
          }
        } else {
          resolvePromise(body);
        }
      }<a
    );*/

    return promise;
  }

  addRequestMethods(requests) {
    Object.keys(requests).forEach((name) => {
      this[name] = (parameters) => {
        let request = requests[name];
        request.name = name;
        return this.makeRequest(request, merge(this.config, parameters || {}));
      };
    });
  }
}
