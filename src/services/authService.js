import axios from 'axios';

// used in components
class AuthService {
  constructor() {
    this.apiUrl = '/api/auth';
    this.fetcher = (...args) => fetch(...args).then((res) => res.json());
  }

  async login({ email, password }) {
    const { data } = await axios.post('/api/auth/login', { email, password });
    return data;
  }

  async signup({ username, email, password }) {
    const { data } = await axios.post('/api/auth/signup', { username, email, password });
    return data;
  }

  async signout() {
    await axios.post('/api/auth/signout');
  }
}

const authService = new AuthService();

export default authService;
