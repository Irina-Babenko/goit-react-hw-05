import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const HomePage = lazi(() => import('../../pages/HomePage/HomePage'));
const MovieDetaliPage = lazi(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage'),
);
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazi(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviwes = lazy(() => import('../MovieReviews/MovieReviews'));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/movieid" element={<MovieDetaliPage />}></Route>
          <Route path="/cast" element={<MovieCast />}></Route>
          <Route path="/reviews" element={<MovieReviwes />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
