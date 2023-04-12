// import MovieList from "@/components/Movies/MovieList";
// import useFetch from "@/components/useFetch/useFetch";
// import useToken from "@/components/useToken/useToken";
// import axios from "axios";
// import { NextRouter, useRouter } from "next/router";
// import { FC, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";




// const ProfilePage1: FC= () => {
//  const [token, setoken ]=useState(true)
//  const [cookies] = useCookies(["user"])
//  const { movies, error, loading } = useFetch();
//  const [data, setData]=useState<any>([])
  
  
//   const movie = movies.filter((movie: any) => movie.creator === cookies.user );
//   console.log(movie)
//   console.log(cookies.user)

//  const fetchUser = async () => {
//   try {
//     const res = await axios.get(`http://localhost:3001/api/users/${cookies.user}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//      const data1 = res.data
//      setData(data1)
//   } catch (error) {
//     console.log(error)
//   }
//  }

//  useEffect(() => {
// fetchUser()
//  }, [])




//   return (
//     <>
//       {error && <p>{error}</p>}
//       {loading && <p>Loading...</p>}
//       <MovieList movies={movie} title="My Movies" />
//       <h2>{data.username}</h2>
//       <h3>{data.email}</h3>
//        <h4>{data.image}</h4>
//        <h4>{data._id}</h4>
//     </>
//   );
// };

// export default ProfilePage1;