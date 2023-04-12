import { Movie } from "@/components/ModelTS/Model"
import {  FC, FormEvent, useState } from "react"
import styles from '@/styles/Form.module.css'
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"


const FormPage:FC = () => {
const [cookies] = useCookies(["user"])
const [data, setData] =useState<Movie>({name:"" , body: "", creator: cookies.user , image: ""})
const [error, setError] =useState<null>(null)
const [isPending, setIsPending] =useState<boolean>(false)
const router = useRouter()

const handleSubmit  = async ( e: FormEvent) => {
  e.preventDefault();
  const formdata: FormData = new FormData();
  formdata.append("image", data.image);
  formdata.append("name", data.name);
  formdata.append("body", data.body);
  formdata.append("creator", data.creator);
  setIsPending(true);
  const res: Response = await fetch("http://localhost:3001/api/movies/add", {
    method: "POST",
    body: formdata,
  });
  const data1: any = await res.json();
  console.log(data1);
  router.push("/")
  setIsPending(false);
  setError(null);
  try {
  } catch (error: any) {
    setError(error.message);
    setIsPending(false);
  }
};


    return (
      <>
      <div className={styles.form}>
     {error && <p>{error}</p>}
     {isPending && <p>Loading..</p>}
      <h1>Create</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
          <input name="name"  onChange={(e) => setData({...data, name: e.target.value})} />
          <textarea name="body" onChange={(e) => setData({...data, body: e.target.value})} />
          <select name="creator" onChange={(e) => setData({...data, creator: e.target.value})}>
            <option value={"mario"}>Mario</option>
            <option value={"marcos"}>MArcos</option>
          </select>
          <input type="file" name="image" onChange={(e: any) => setData({...data, image: e.target.files[0]})} />
          <button>Submit</button>
        </form> 
      </div>
   </>
    );
}

export default FormPage