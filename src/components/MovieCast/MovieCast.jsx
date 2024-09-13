import React, { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../fetchTMDB';
import css from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) {
    return <p>Error loading cast</p>;
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
