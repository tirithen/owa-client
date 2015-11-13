import config from './config';
import OWAClient from './OWAClient';

let client = new OWAClient(config.httpClient);

client.config.host = 'myhost';
client.config.username = 'myusername';
client.config.password = 'mypassword';

client.login()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
