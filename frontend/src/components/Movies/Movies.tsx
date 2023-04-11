import { FC, useEffect, useState } from "react";
import MovieList from "./MovieList";
import useFetch from "../useFetch/useFetch";

const Movies: FC = () => {
 const {movies, error, loading} =useFetch()

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <MovieList movies={movies} title="All Movies" />
    </>
  );
};

export default Movies;
