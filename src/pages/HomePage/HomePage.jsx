// src/pages/HomePage/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../fetchTMDB'; // Импорт функции для получения трендовых фильмов
import MovieList from '../../components/MovieList/MovieList'; // Импорт компонента для отображения списка фильмов
import css from './HomePage.module.css'; // Импорт стилей, если есть

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
