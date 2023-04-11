import { FC, useEffect, useState } from "react";
import MovieList from "./MovieList";

const Movies: FC = () => {
  const [movies, setMovies] = useState<any>([]);
  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData: () => Promise<void> = async () => {
    try {
      const res: Response = await fetch("http://localhost:3001/api/movies");

      const data = await res.json();
      console.log(data);
      setMovies(data);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <MovieList movies={movies} title="All Movies" />
    </>
  );
};

export default Movies;
