import React from 'react';

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="col"
          onClick={() => onSelectMovie(movie.id)}
        >
          <div className="card h-100 shadow-sm">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="card-img-top"
              alt={movie.title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
