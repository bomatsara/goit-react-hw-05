import css from './HomePage.module.css';
import Section from '../../components/layout/Section/Section.jsx';
import { useEffect, useState } from 'react';
import getTrendingMovies from '../../js/tmdb/api/getTrendingMovies.js';
import toast from 'react-hot-toast';
import MovieList from '../../components/MoviesList/MoviesList.jsx';
import Loader from '../../components/Loader/Loader.jsx';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        const response = await getTrendingMovies();

        if (response.data.results.length === 0) {
          toast.error('Error during request. Reload and try again.');
        }

        setTrendingMovies(response.data.results);
      } catch (e) {
        toast.error('Error during request. Reload and try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <Section className='section-home'>
      <h2 className={css['title']}>Trending films</h2>
      {loading && <Loader />}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} /> }
    </Section>
  );
};