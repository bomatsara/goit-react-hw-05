import css from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieSearch from '../../components/MovieSearch/MovieSearch.jsx';
import MoviesList from '../../components/MoviesList/MoviesList.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import toast from 'react-hot-toast';
import getMovieByQuery from '../../js/tmdb/api/getMovieByQuery.js';
import Section from '../../components/layout/Section/Section.jsx';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;

    async function fetchMovies(search){
      setMovies([]);

      try {
        setLoading(true);
        const response = await getMovieByQuery(search);

        if (response.data.results.length === 0) {
          toast.error('Error during request. Reload and try again.');
        } else {
          setMovies(response.data.results);
        }
      } catch (e) {
        toast.error('Error during request. Reload and try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies(search);
  }, [search]);

  return (
    <Section className='section-movies'>
      <div className={css['movies-search']}>
        <MovieSearch setSearchParams={setSearchParams} />
      </div>

      {loading && <Loader />}

      <div className={css['movies-list']}>
        {movies.length > 0 ? (
          <MoviesList movies={movies} />
        ) : (
          search && <p>No films with this title were found</p>
        )}
      </div>
    </Section>
  );
};