import credentials from '../credentials.js';
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function getCastByMovieId(movieId) {
  return await axios.get(`/3/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${credentials.access_key}`
    },
    params: {
      language: 'en-US',
    }
  });
}