import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../../fetchTMDB';
import css from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews'),
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = '/';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (error) return <div>Error fetching movie details.</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      <Link to={backLinkHref} className={css.goBackLink}>
        Go back
      </Link>
      <div className={css.movieDetails}>
        {movie.poster_path && (
          <img
            src={movie.poster_path}
            alt={movie.title}
            className={css.poster}
          />
        )}
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>
      <div>
        <Suspense fallback={<div>Loading cast...</div>}>
          <MovieCast movieId={movieId} />
        </Suspense>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <MovieReviews movieId={movieId} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
