import { FC, useEffect, useState } from "react";
import MovieList from "./MovieList";
import useFetch from "../useFetch/useFetch";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

const Movies: FC = () => {
 const {movies, error, loading} =useFetch()
 const [currentPage, setCurrentPage] =useState(1)
 const [moviesPerPage, setMoviesPerPage] =useState(2)

 const lastMovieIndex = currentPage * moviesPerPage
 const firstMovieIndex = lastMovieIndex - moviesPerPage
 const currentMovies: any = movies.slice(firstMovieIndex, lastMovieIndex)

 
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <SearchBar  movies={movies} />
      <MovieList movies={currentMovies} title="All Movies" />
      <Pagination totalMovies={movies.length} setCurrentPage={setCurrentPage}  moviesPerPage={moviesPerPage} />
    </>
  );
};

export default Movies;
