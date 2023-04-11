import MovieDetailItem from "@/components/Movies/MovieDetailItem/MovieDetailItem";
import useFetch from "@/components/useFetch/useFetch";
import { useRouter } from "next/router";



const MovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.movieid;
  const { movies, error } = useFetch();
  const movie = movies?.find((movie: any) => movie._id === movieId);

  if (!movie) return <p>Loading...</p>;




  
  return (
    <>
      {error && <p>{error}</p>}
      <MovieDetailItem movie={movie} />
    </>
  );
};

export default MovieDetails;
