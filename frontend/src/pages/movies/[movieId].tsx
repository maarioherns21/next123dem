import MovieDetailItem from "@/components/Movies/MovieDetailItem/MovieDetailItem";
import useFetch from "@/components/useFetch/useFetch";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const MovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.movieid;
  const { movies, error } = useFetch();
  const movie = movies.find((movie: any) => movie._id === movieId);

  if (!movie) return <p>Loading...</p>;

  const handleDelete = async () => {
  
    try {
      const res = await fetch(`http://localhost:3001/api/movies/${movieId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };






  return (
    <>
      {error && <p>{error}</p>}
      <MovieDetailItem movie={movie} />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default MovieDetails;
