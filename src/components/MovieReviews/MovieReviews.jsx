import React, { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../fetchTMDB'; // Импорт API для получения отзывов
import css from './MovieReviews.module.css'; // Импорт стилей

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>Error loading reviews</p>;
  if (reviews.length === 0) return <p>No reviews available for this movie</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>Reviews</h2>
      <ul className={css.reviewList}>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewItem}>
            <p className={css.author}>Author: {review.author}</p>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
