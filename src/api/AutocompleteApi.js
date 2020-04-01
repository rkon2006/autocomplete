import { RestApi } from './RestApi';

export class AutocompleteApi extends RestApi {
  constructor(config) {
    super(config);
  }
  getSuggestions = async () => {
    const res = await this.get('/');
  }
}