import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import SearchResultsPage from './components/SearchResultsPage';
import MovieDetailsPage from './components/MovieDetailsPage';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [mysteryMovies, setMysteryMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  useEffect(() => {
    fetchTopMovies();
    fetchGenreMovies();
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const fetchGenreMovies = async () => {
    try {
      const [actionRes, mysteryRes, horrorRes, comedyRes, animationRes] = await Promise.all([
        axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }),
        axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=9648', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }),
        axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=27', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }),
        axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=35', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }),
        axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=16', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        })
      ]);
      
      setActionMovies(actionRes.data.results.slice(0, 20));
      setMysteryMovies(mysteryRes.data.results.slice(0, 20));
      setHorrorMovies(horrorRes.data.results.slice(0, 20));
      setComedyMovies(comedyRes.data.results.slice(0, 20));
      setAnimationMovies(animationRes.data.results.slice(0, 20));
    } catch (error) {
      console.error('Error fetching genre movies:', error);
    }
  };

  const fetchTopMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?page=1',
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }
      );
      setTopMovies(response.data.results.slice(0, 20));
    } catch (error) {
      console.error('Error fetching top movies:', error);
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }
      );
      setMovies(response.data.results);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
          }
        }
      );
      setSelectedMovie({
        ...response.data,
        cast: response.data.credits.cast.slice(0, 5),
      });
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App container-fluid p-0">
      <Routes className="m-0">
        <Route 
          path="/" 
          element={
            <HomePage 
              topMovies={topMovies}
              actionMovies={actionMovies}
              mysteryMovies={mysteryMovies}
              horrorMovies={horrorMovies}
              comedyMovies={comedyMovies}
              animationMovies={animationMovies}
              onSelectMovie={(movie) => {
                fetchMovieDetails(movie.id);
              }}
            />
          } 
        />
        <Route
          path="/search"
          element={
            <SearchResultsPage
              movies={movies}
              onSelectMovie={(movie) => {
                fetchMovieDetails(movie.id);
              }}
            />
          }
        />
        <Route
          path="/movie/:movieId"
          element={
            <MovieDetailsPage 
              movie={selectedMovie}
              isLoading={isLoading}
              error={error}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
