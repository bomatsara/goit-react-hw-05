import credentials from '../credentials.js';
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function getTrendingMovies() {
  return await axios.get('/3/trending/movie/day', {
    headers: {
      Authorization: `Bearer ${credentials.access_key}`
    },
    params: {
      language: 'en-US',
    }
  });
}