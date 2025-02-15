import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="metadata">
          <p><strong>Popularity:</strong> {movie.popularity}</p>
          <p><strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
        </div>
        <div className="cast">
          <h3>Cast:</h3>
          <ul>
            {movie.cast?.map(actor => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
