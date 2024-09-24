import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMovieDetails } from '../../fetchTMDB';
import css from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkHref = useRef(location.state?.from ?? '/');

  const onClickBack = () => navigate(backLinkHref.current);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId, { signal });
        setMovie(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (!movie) return null;

  const { title, release_date, poster_path, vote_average, overview, genres } =
    movie;
  const releaseYear = new Date(release_date).getFullYear() || '-';
  const titleWithYear = `${title} (${releaseYear})`;

  return (
    <main className={css.container}>
      <button onClick={onClickBack} className={css.btnBack}>
        Go back
      </button>

      <div className={css.movieDetails}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={title}
            className={css.poster}
          />
        ) : (
          <p className={css.notification}>No image available</p>
        )}
        <div className={css.info}>
          <h1>{titleWithYear}</h1>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          {genres.length > 0 ? (
            <p>{genres.map(genre => genre.name).join(', ')}</p>
          ) : (
            <p className={css.notification}>
              This movie currently has no genre information.
            </p>
          )}
        </div>
      </div>

      <p className={css.text}>More about this movie</p>

      <ul className={css.linkList}>
        <li>
          <NavLink to="cast" className={css.linkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={css.linkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
