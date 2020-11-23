import axios from 'axios';

class ImageService {
  constructor() {
    this.apiUrl = '/api/image';
    this.fetcher = (...args) => fetch(...args).then((res) => res.json());
  }

  create({ name, image }) {
    const promise = axios.post('/api/image/create', { name, image });
    promise
      .then((res) => console.log(res))
      .catch((e) => {
        console.log('from service error');
      });
    return promise;
  }

  getImageList({ startAfter = '' }) {
    const promise = axios.get('/api/image', { params: { startAfter } });
    promise
      .then((res) => console.log(res))
      .catch((e) => {
        console.log('from service error');
      });
    return promise;
  }
}

const imageService = new ImageService();

export default imageService;
