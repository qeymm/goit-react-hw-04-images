import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';

// Taken from goit-js-hw-11
const API_KEY = '51112360-6ba7af76f8c8cdf9e0f2073de';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);

  return response.data;
};
