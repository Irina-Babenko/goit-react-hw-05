import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovieCast } from '../../fetchTMDB';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCast = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieCast = await fetchMovieCast(movieId, { signal });
        setCast(movieCast);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getCast();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className={css.container}>
      <h2 className={css.title}>Cast</h2>
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map(({ character, name, profile_path, id }) => (
            <li key={id} className={css.castItem}>
              <div className={css.wrapper}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92/${profile_path}`}
                    alt={name}
                    className={css.actorImage}
                  />
                ) : (
                  <p className={css.notification}>No image available</p>
                )}
                <div className={css.info}>
                  <p className={css.actorName}>
                    <strong>Actor:</strong> {name}
                  </p>
                  <p className={css.character}>
                    <strong>Character:</strong> {character}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.error}>No cast information found for this film.</p>
      )}
    </div>
  );
};

export default MovieCast;
