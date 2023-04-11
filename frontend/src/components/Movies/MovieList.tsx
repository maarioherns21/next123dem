import { FC } from "react"
import { Movie } from "../ModelTS/Model";
import Link from "next/link";
import style from '@/styles/Home.module.css'

interface Props {
    movies: Movie[]
    title: string
}


const MovieList: FC<Props> = ({ movies, title }) => {
    return (
        <>
            <h1>{title}</h1>
            {movies.map((movie) => (
                <div key={movie._id}>
                   <Link href={`/movies/${movie._id}`}>
                   <img className={style.cover} src={`https://fulltank.s3.us-west-1.amazonaws.com/${movie.image}`} alt={movie.name} />
                    <h2>{movie.name}</h2>
                   </Link>
                </div>
            ))}
        </>
    );
};

export default MovieList