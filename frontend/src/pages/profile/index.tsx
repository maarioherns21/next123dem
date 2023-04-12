import MovieList from "@/components/Movies/MovieList";
import useFetch from "@/components/useFetch/useFetch";
import { FC } from "react";

const ProfilePage: FC = () => {
  const { movies, error, loading } = useFetch();
  const movie = movies.filter((movie: any) => movie.creator == "mario");



  
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <MovieList movies={movie} title="My Movies" />
    </>
  );
};

export default ProfilePage;
