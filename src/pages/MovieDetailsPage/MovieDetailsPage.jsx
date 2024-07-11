import css from './MovieDetailsPage.module.css';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMovieById from '../../js/tmdb/api/getMovieById.js';
import Loader from '../../components/Loader/Loader.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import Section from '../../components/layout/Section/Section.jsx';
import getImage from '../../js/tmdb/getImage.js';
import clsx from 'clsx';
import { getRatingQuality } from '../../js/utils.js';
import { BsCalendar2WeekFill } from 'react-icons/bs';
import BackLink from '../../components/BackLink/BackLink.jsx';
import { BiSolidMovie } from 'react-icons/bi';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isNaN(Number(movieId))) {
      setError(true);
      setLoading(false);
      return;
    }

    async function fetchMovieDetail() {
      try {
        const response = await getMovieById(movieId);

        if (!response || response.data.length === 0) {
          setError(true);
        } else {
          setMovieDetail(response.data);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetail();
  }, [movieId]);

  function buildLinkClass ({ isActive }) {
    return clsx(css['link'], isActive && css['active']);
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !movieDetail) {
    return <NotFoundPage />;
  }

  const { poster_path, title, overview, genres, vote_average, vote_count } = movieDetail;
  const rating = Math.round(vote_average * 10);

  return (
    <Section className='section-movie-detail'>
      <BackLink />

      <div className={css['movie-wrap']}>
        <div className={css['movie-image']}>
          {poster_path ?
            <img src={getImage(poster_path)} alt={title} /> :
            (
              <div className={css['image-stub']}><BiSolidMovie className={css['icon']} /></div>
            )
          }
        </div>

        <div className={css['movie-info']}>
          <h1 className={css['movie-title']}>{title}</h1>

          {vote_count === 0 && (
            <div className={css['movie-expected']}>Release expected <BsCalendar2WeekFill /></div>
          )}

          {vote_count > 0 && (
            <div className={
              clsx(
                css['movie-rating'],
                vote_count > 0 && css[`movie-rating-${getRatingQuality(rating)}`],
              )
            }>
              <div className={css['movie-label']}>User score</div>
              <div className={css['rating']}>{rating}%</div>
            </div>
          )}

          <div className={css['movie-overview']}>
            <div className={css['movie-label']}>Overview</div>
            <div className={css['movie-overview-text']}>{overview}</div>
          </div>

          <div className={css['movie-genre']}>
            <div className={css['movie-label']}>Genre</div>

            <ul className={css['movie-genre-list']}>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={css['movie-additional']}>
          <div className={css['movie-label']}>Additional information</div>

          <div className={css['movie-additional-nav']}>
            <NavLink to="cast" className={buildLinkClass} state={location.state}>Cast</NavLink>
            <NavLink to="reviews" className={buildLinkClass} state={location.state}>Reviews</NavLink>
          </div>

          <div className={css['movie-additional-content']}>
            <Outlet />
          </div>
        </div>
      </div>
    </Section>
  )
};