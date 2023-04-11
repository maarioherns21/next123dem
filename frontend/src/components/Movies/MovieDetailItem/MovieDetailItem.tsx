import { Movie } from "@/components/ModelTS/Model";
import { FC } from "react";
import style from '@/styles/Home.module.css'


interface Props {
    movie : Movie
}


const MovieDetailItem:FC<Props> = ({movie}) => {
  
  
  
    return (
    <>
      <h1>{movie.name}</h1>
      <img
        className={style.cover}
        src={`https://fulltank.s3.us-west-1.amazonaws.com/${movie.image}`}
        alt={movie.name}
      />
      <h3>{movie.body}</h3>
      <h4>{movie.creator}</h4>
    </>
  );
};

export default MovieDetailItem