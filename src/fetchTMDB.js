import axios from 'axios';

const API_KEY = '558a7994d2b11d5c39d7de8f8e63ee6e';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhNzk5NGQyYjExZDVjMzlkN2RlOGY4ZTYzZWU2ZSIsIm5iZiI6MTcyNjE1NTc2Mi4yOTI1NDcsInN1YiI6IjY2ZTMwNTM0OTAxM2ZlODcyMjIzOWU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LT5ScBkK5FMwFY0DN0lyyc0LRtm4aE5iuisTgPYlRdk`,
  },
});

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchTrendingMovies = async () => {
  try {
    const response = await instance.get('/trending/movie/day');
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, { signal, page = 1 }) => {
  try {
    const response = await instance.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
      signal,
    });
    return {
      results: response.data.results || [],
      totalPages: response.data.total_pages || 0,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}`);
    const movie = response.data;
    return {
      poster_path: movie.poster_path
        ? `${IMAGE_URL}${movie.poster_path}`
        : null,
      title: movie.title || 'Unknown title',
      release_date: movie.release_date || 'N/A',
      vote_average: movie.vote_average || 'N/A',
      overview: movie.overview || 'No overview available.',
      genres: movie.genres || [],
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieCast = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}/credits`);
    return response.data.cast || [];
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

export const fetchMovieReviews = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}/reviews`);
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

export { IMAGE_URL };
