import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../fetchTMDB';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [moviesData, setMoviesData] = useState({
    movies: [],
    totalPages: 1,
    hasSearched: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchMovies = useCallback(async () => {
    if (!query) return;

    try {
      setLoading(true);
      setError(false);
      const data = await searchMovies(query, { page: currentPage });
      setMoviesData(prevData => ({
        movies: [...prevData.movies, ...data.results],
        totalPages: data.totalPages,
        hasSearched: true,
      }));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = newQuery => {
    if (newQuery === '') {
      toast.error('Enter some title!');
      return;
    }
    setSearchParams({ query: newQuery, page: 1 });
    setMoviesData({
      movies: [],
      totalPages: 1,
      hasSearched: false,
    });
  };

  const loadMoreMovies = () => {
    setSearchParams({ query, page: currentPage + 1 });
  };

  const { movies, totalPages, hasSearched } = moviesData;
  const shouldShowLoadMore =
    movies.length > 0 && currentPage < totalPages && !loading;

  return (
    <main className={css.container}>
      <SearchBar onSearch={handleSearch} />

      {hasSearched &&
        (movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <div className={css.error}>Not found!</div>
        ))}

      {shouldShowLoadMore && <LoadMoreBtn onClick={loadMoreMovies} />}

      {loading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default MoviesPage;
