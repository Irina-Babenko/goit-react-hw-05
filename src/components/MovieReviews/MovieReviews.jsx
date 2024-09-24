import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovieReviews } from '../../fetchTMDB';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieReviews = await fetchMovieReviews(movieId, { signal });
        setReviews(movieReviews);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getReviews();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className={css.container}>
      <h2 className={css.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.author}>
                Author: <strong>{review.author}</strong>
              </p>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.error}>No reviews information found for this film.</p>
      )}
    </div>
  );
};

export default MovieReviews;
