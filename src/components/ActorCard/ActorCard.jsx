import css from './ActorCard.module.css';
import getImage from '../../js/tmdb/getImage.js';
import { FaUser } from "react-icons/fa";

export default function ActorCard({ actor }) {
  const { name, profile_path } = actor;

  return (
    <>
      <div className={css['actor-card']}>
        <div className={css['actor-card-image']}>
          {profile_path ?
            <img src={getImage(profile_path)} alt={name} /> :
            (
              <div className={css['image-stub']}><FaUser className={css['icon']} /></div>
            )
          }
        </div>
        <div className={css['actor-card-name']}>{name}</div>
      </div>
    </>
  );
};