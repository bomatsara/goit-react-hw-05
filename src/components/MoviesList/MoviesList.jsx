import css from './MoviesList.module.css';
import MovieCard from '../MovieCard/MovieCard.jsx';
import { useLocation } from 'react-router-dom';

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <>
      <div className={css['movies-list']}>
        {movies.map((movie, index) => (
          <div key={movie.id} className={css['movies-list-item']}>
            <MovieCard location={location} movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};