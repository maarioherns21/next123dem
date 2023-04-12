import { FC, useEffect, useState } from "react";
import { Movie } from "../ModelTS/Model";
import Link from "next/link";
import style from "@/styles/Home.module.css"
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';

interface Props {
  movies: Movie[];
}

const SearchBar: FC<Props> = ({ movies }) => {
  const [output, setOutput] = useState<any>([]);
  const [input, setInput] = useState<any>([]);
  const [error, setError] =useState<null>(null)
  const [isPending, setIspending] =useState(true)

  const searchByName = async (input: string, movies: any[], setOutput: (output: any) => void, setIspending: (isPending: boolean) => void, setError: (error: null) => void): Promise<void> => {
    try {
      const filteredMovies = movies.filter((movie: any) => movie.name.toLowerCase().includes(input.toLowerCase()));
      setOutput(filteredMovies);
      setIspending(false);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setIspending(false);
    }
  };
  
  useEffect(() => {
    setOutput([]);
    searchByName(input, movies, setOutput, setIspending, setError);
  }, [input]);

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
        <h3>Search</h3>
        <input onChange={(e) => setInput(e.target.value)} />
      </div>
   
      <Popup trigger={<button>Search</button>}>
      {output.length > 0 ? (
      output
        .sort((a: any , b: any ) =>  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        .map((movie: any) => (
          <div key={movie._id}>
            <Link href={`/movies/${movie._id}`}>
              <img
                className={style.cover}
                src={`https://fulltank.s3.us-west-1.amazonaws.com/${movie.image}`}
                alt={movie.name}
              />
              <h2>{movie.name}</h2>
            </Link>
          </div>
        ))
    ) : (
      <p>No results found</p>
    )}
      </Popup> 
    </>
  );
};

export default SearchBar;
