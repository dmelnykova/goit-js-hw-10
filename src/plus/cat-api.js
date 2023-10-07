import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const PART_OF_URL = 'https://api.thecatapi.com/v1/images/search';

const KEY ='live_y0sjEivX9lvVsTk8uxTvxy1iwibarhoa6K8Sx0Tz6RhCbASFpkx7NhXvzohTjekB';
  
axios.defaults.headers.common['x-api-key'] = KEY;

export function fetchBreeds() {
  return axios.get(BASE_URL);
};

export function fetchCatByBreed(breedId) {
  return axios.get(`${PART_OF_URL}?breed_ids=${breedId}`);
};