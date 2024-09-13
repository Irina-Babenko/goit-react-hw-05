import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../fetchTMDB';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

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
