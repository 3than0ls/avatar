import axios from 'axios';

class ImageService {
  constructor() {
    this.apiUrl = '/api/image';
  }

  create({ name, image }) {
    const promise = axios.post('/api/image/create', { name, image });
    promise.then((res) => res.json()).catch((e) => {});
    return promise;
  }

  getImageList({ startAfter = '' }) {
    const promise = axios.get('/api/image', { params: { startAfter } });
    promise.then((res) => res.json()).catch((e) => {});
    return promise;
  }
}

const imageService = new ImageService();

export default imageService;
