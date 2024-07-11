import credentials from '../credentials.js';
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function getMovieByQuery(query = '') {
  return await axios.get(`/3/search/movie`, {
    headers: {
      Authorization: `Bearer ${credentials.access_key}`
    },
    params: {
      language: 'en-US',
      query: query
    }
  });
}