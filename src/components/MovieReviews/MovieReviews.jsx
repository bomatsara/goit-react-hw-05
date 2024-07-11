import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import getReviewsByMovieId from '../../js/tmdb/api/getReviewstByMovieId.js';
import Loader from '../Loader/Loader.jsx';
import ReviewCard from '../ReviewCard/ReviewCard.jsx';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);

      try {
        const response = await getReviewsByMovieId(movieId);

        if (!response.data.results) {
          toast.error('Problem during loading reviews');
        } else {
          setReviews(response.data.results);
        }
      } catch (e) {
        toast.error('Error fetching reviews data');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <>
      { loading && <Loader /> }
      { reviews.length === 0 && <div>No reviews yet</div> }

      {reviews.length > 0 && (
        reviews.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
          </div>
        ))
      )}
    </>
  );
};