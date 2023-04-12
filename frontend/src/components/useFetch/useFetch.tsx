import { useEffect, useState } from "react";



const  useFetch = () => {
    const [movies, setMovies] = useState([]);
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

    return {
       movies, error, loading
    }
}

export default useFetch 