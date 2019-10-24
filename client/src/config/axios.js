import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server-hacktivoverflow.andreassosilo.co',
});

export default instance;
