import axios from 'axios';

class AuthService {
  constructor() {
    this.apiUrl = '/api/auth';
    this.fetcher = (...args) => fetch(...args).then((res) => res.json());
  }

  login({ email, password }) {
    const promise = axios.post('/api/auth/login', { email, password });
    promise
      .then((res) => console.log(res))
      .catch((e) => {
        console.log('from service error');
      });
    return promise;
  }

  signup({ username, email, password }) {
    const promise = axios.post('/api/auth/signup', { username, email, password });
    promise
      .then((res) => console.log(res))
      .catch((e) => {
        console.log('from service error');
      });
    return promise;
  }

  signout() {
    const promise = axios.post('/api/auth/signout');
    promise
      .then((res) => console.log(res))
      .catch((e) => {
        console.log('from service error');
      });
    return promise;
  }
}

const authService = new AuthService();

export default authService;
