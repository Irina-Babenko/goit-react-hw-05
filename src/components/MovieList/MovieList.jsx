import React from 'react';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css'; // Исправьте имя файла

const MovieList = ({ movies }) => (
  <ul className={css.movieList}>
    {movies.map(movie => (
      <li key={movie.id} className={css.movieItem}>
        <Link to={`/movies/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className={css.poster}
          />
          <h2>{movie.title}</h2>
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieList;
