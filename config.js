// localStorage polyfill
if (typeof window === 'undefined') {
  var window = {};
}

if (!window.localStorage) {
  window.localStorage = {};
}

if (!window.localStorage.getItem) {
  window.localStorage.getItem = () => {};
}

// Setup config

let config = {};

config.httpClient = {
  host: window.localStorage.getItem('host'),
  username: window.localStorage.getItem('username'),
  password: window.localStorage.getItem('password'),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36',
    'Accept-Language': 'sv,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'DNT': '1',
    //'Connection': 'keep-alive'
  }
};

config.httpClient.requests = {
  login: {
    url: 'https://{host}/owa/auth.owa',
    method: 'POST',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'destination': 'https://{host}/owa/',
      'flags': '0',
      'forcedownlevel': '0',
      'trusted': '0',
      'username': '{username}',
      'password': '{password}',
      'isUtf8': '1'
    }
  }
};

export default config;
