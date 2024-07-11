import credentials from '../credentials.js';
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function getReviewsByMovieId(movieId) {
  return await axios.get(`/3/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${credentials.access_key}`
    },
    params: {
      page: 1,
      language: 'en-US',
    }
  });
}