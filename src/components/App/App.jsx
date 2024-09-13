import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from './App.module.css';

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
    <div className={css.appContainer}>
      {' '}
      <div className={css.starfield}>
        {/* Генерация звезд */}
        {Array.from({ length: 250 }).map((_, index) => (
          <div
            key={index}
            className={css.star}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 1}s`,
            }}
          />
        ))}
      </div>
      <Navigation />
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
    </div>
  );
};

export default App;
