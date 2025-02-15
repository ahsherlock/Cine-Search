import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieDetailsPage = ({ movie, isLoading, error }) => {
  const navigate = useNavigate();

  if (isLoading) return <div className="d-flex justify-content-center align-items-center vh-100">Loading movie details...</div>;
  if (error) return <div className="alert alert-danger text-center mt-4">Error: {error}</div>;
  if (!movie) return <div className="alert alert-warning text-center mt-4">No movie data available</div>;

  return (
    <div className="container my-4">
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Back to Search</button>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
      
      <div className="row" data-testid="movie-details-content">
        <div className="col-md-4 mb-4">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            className="img-fluid rounded shadow"
            alt={movie.title} 
          />
        </div>
        
        <div className="col-md-8">
          <h1 className="mb-3">{movie.title}</h1>
          <p className="lead mb-4">{movie.overview}</p>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Movie Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Release Date:</strong> {movie.release_date}</p>
                  <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                  <p><strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Popularity:</strong> {movie.popularity}</p>
                  <p><strong>Vote Average:</strong> {movie.vote_average}</p>
                  <p><strong>Vote Count:</strong> {movie.vote_count}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Cast</h5>
              <ul className="list-group list-group-flush">
                {movie.cast?.map(actor => (
                  <li key={actor.id} className="list-group-item">{actor.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
