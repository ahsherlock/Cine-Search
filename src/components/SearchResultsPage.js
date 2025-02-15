import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';

const SearchResultsPage = ({ movies, onSelectMovie }) => {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div className="mb-4">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
      <h2 className="mb-4">Search Results</h2>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        <MovieList movies={movies} onSelectMovie={onSelectMovie} />
      </div>
    </div>
  );
};

export default SearchResultsPage;
