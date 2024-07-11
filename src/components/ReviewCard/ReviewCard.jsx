import css from './ReviewCard.module.css';
import getImage from '../../js/tmdb/getImage.js';

export default function ReviewCard({ review }) {
  const {author, author_details, content, created_at, url} = review;
  const { name = '', username = '', avatar_path = '', rating = null } = author_details;

  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className={css['review-card']}>
      <div className={css['header']}>
        <div className={css['avatar']}>
          {avatar_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${avatar_path}`} alt={`${username}'s avatar`} />
          ) : (
            <div className={css['default-avatar']}>{username?.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className={css['author-info']}>
          <h3 className={css['author-name']}>{name || author}</h3>
          {username && <p className={css['username']}>@{username}</p>}
        </div>
        <div className={css['rating']}>{rating ? `Rating: ${rating}/10` : 'No rating'}</div>
      </div>
      <div className={css['content']} dangerouslySetInnerHTML={createMarkup(content)} />
      <div className={css['footer']}>
        <div className={css['created-at']}>Reviewed on: {formattedDate}</div>
        <a href={url} target="_blank" rel="noopener noreferrer" className={css['read-more']}>
          Read more
        </a>
      </div>
    </div>
  );
};