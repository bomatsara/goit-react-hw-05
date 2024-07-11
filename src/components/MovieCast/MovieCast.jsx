import css from './MovieCast.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMovieById from '../../js/tmdb/api/getMovieById.js';
import getCastByMovieId from '../../js/tmdb/api/getCastByMovieId.js';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader.jsx';
import ActorCard from '../ActorCard/ActorCard.jsx';

export default function MovieCast() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [displayedCast, setDisplayedCast] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);

      try {
        const response = await getCastByMovieId(movieId);

        if (!response || response.data.cast.length === 0) {
          toast.error('Problem during loading cast');
        } else {
          setCast(response.data.cast);
          setDisplayedCast(response.data.cast.slice(0, itemsPerPage));
        }
      } catch (e) {
        toast.error('Error fetching cast data');
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);


  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 2 && !loading) {
        loadMore();
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, cast, page]);

  const loadMore = () => {
    if (displayedCast.length >= cast.length) return;

    const nextPage = page + 1;
    const newDisplayedCast = cast.slice(0, itemsPerPage * nextPage);
    setDisplayedCast(newDisplayedCast);
    setPage(nextPage);
  };

  return (
    <>
      { loading && <Loader /> }

      {displayedCast.length > 0 && (
        <div className={css['castList']}>
          {displayedCast.map(actor => (
            <div key={actor.id}>
              <ActorCard actor={actor} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};