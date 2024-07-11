import credentials from '../credentials.js';
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function getMovieById(movieId) {
  return await axios.get(`/3/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${credentials.access_key}`
    },
    params: {
      language: 'en-US',
    }
  });
}