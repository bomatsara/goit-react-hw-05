import css from './MovieCard.module.css';
import getImage from '../../js/tmdb/getImage.js';
import { getRatingQuality, truncateText } from '../../js/utils.js';
import { BsCalendar2WeekFill } from "react-icons/bs";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BiSolidMovie } from 'react-icons/bi';

export default function MovieCard({ movie, location }) {
  const { poster_path, title, id, overview, vote_average, vote_count} = movie;

  const rating = Math.round(vote_average * 10);

  return (
    <Link to={`/movies/${id}`} state={location} className={css['card']}>
      <div className={css['card-image']}>

        {poster_path ?
          <img src={getImage(poster_path)} alt={title} /> :
          (
            <div className={css['image-stub']}><BiSolidMovie className={css['icon']} /></div>
          )
        }

        <div className={
          clsx(
            css['card-rating'],
            vote_count > 0 && css[`card-rating-${getRatingQuality(rating)}`],
            vote_count === 0 && css['card-rating-expected']
          )
        }>{vote_count > 0 ? `${rating}%` : <BsCalendar2WeekFill />}</div>
      </div>

      <div className={css['card-wrap']}>
        <div className={css['card-title']}>{title}</div>
        <div className={css['card-des']}>{truncateText(overview)}</div>
      </div>
    </Link>
)
  ;
};