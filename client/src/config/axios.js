import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://server-hacktivoverflow.andreassosilo.co',
});

export default instance;
