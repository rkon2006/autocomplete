import axios from 'axios';

export class RestApi {
  constructor(config) {
    this.api = axios.create(config);
    this.api.interceptors.request.use((param) => ({
      ...param,
    }));
  }

  get = (url, config) => {
    return this.api.get(url, config);
  };
}
