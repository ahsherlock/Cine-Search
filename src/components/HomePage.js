import React from 'react';
import SearchBar from './SearchBar';
import MovieCarousel from './MovieCarousel';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ topMovies, actionMovies, mysteryMovies, horrorMovies, comedyMovies, animationMovies, onSelectMovie }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${query}`);
  };
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3 fw-bold mb-4">Welcome to CineSearch</h1>
        <p className="lead mb-4">Your ultimate movie search experience</p>
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        {topMovies && topMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Top Movie Recommendations</h2>
            <MovieCarousel 
              movies={topMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}

        {actionMovies && actionMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Action Movies</h2>
            <MovieCarousel 
              movies={actionMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}

        {mysteryMovies && mysteryMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Mystery Movies</h2>
            <MovieCarousel 
              movies={mysteryMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}

        {horrorMovies && horrorMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Horror Movies</h2>
            <MovieCarousel 
              movies={horrorMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}

        {comedyMovies && comedyMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Comedy Movies</h2>
            <MovieCarousel 
              movies={comedyMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}

        {animationMovies && animationMovies.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Animation Movies</h2>
            <MovieCarousel 
              movies={animationMovies}
              onSelectMovie={onSelectMovie}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
