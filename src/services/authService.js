import axios from 'axios';

// used in components
class AuthService {
  constructor() {
    this.apiUrl = '/api/auth';
    this.fetcher = (...args) => fetch(...args).then((res) => res.json());
  }

  login({ email, password }) {
    const promise = axios.post('/api/auth/login', { email, password });

    promise.then((res) => {}).catch((e) => {});
    return promise;
  }

  signup({ username, email, password }) {
    const promise = axios.post('/api/auth/signup', { username, email, password });

    promise.then((res) => {}).catch((e) => {});
    return promise;
  }

  signout() {
    const promise = axios.post('/api/auth/signout');

    promise.then((res) => {}).catch((e) => {});
    return promise;
  }
}

const authService = new AuthService();

export default authService;
