import { Movie } from "@/components/ModelTS/Model";
import MovieList from "@/components/Movies/MovieList";
import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";
import useFetch from "@/components/useFetch/useFetch";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";


interface Props {
  movie: Movie[]
}



const ProfilePage: FC<Props> = () => {
  // const [token, setoken ]=useState(true)
  const [cookies] = useCookies(["user", "token"]);
  const { movies, error, loading } = useFetch();
  const [data, setData] = useState<any>([]);
  const [userError, setUserError] =useState<null>(null)
  const [isLoading, setIsLoading] =useState<boolean>(true)
  const movie = movies.filter((movie: any) => movie.creator === cookies.user);
   
  const fetchUser: () => Promise<void> = async () => {
    try {
      const res: AxiosResponse = await axios.get(`http://localhost:3001/api/users/${cookies.user}`, {
      headers: { Authorization: `Bearer ${cookies.token}` }});
      const data1: any = res.data;
      setData(data1);
      setUserError(null)
      setIsLoading(false)
    } catch (error : any ) {
      setUserError(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {error && <p>{error}</p> || userError && <p>{userError}</p>}
      {loading && <p>Loading...</p> || isLoading && <p>Loading.....</p>}
      <MovieList movies={movie} title="My Movies" />
      <ProfileDetails data={data} />
    </>
  );
};

export default ProfilePage;