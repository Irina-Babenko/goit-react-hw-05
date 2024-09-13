import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from './App.module.css'; // Импортируйте стили

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage'),
);
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

const App = () => {
  return (
    <div className={css.app}>
      <header className={css.header}>
        <Navigation />
      </header>
      <main className={css.mainContent}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer className={css.footer}>{/* Footer content if needed */}</footer>
    </div>
  );
};

export default App;
