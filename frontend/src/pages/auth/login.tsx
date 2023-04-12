import { User } from "@/components/ModelTS/Model"
import { FormEvent, useState } from "react"
import styles from "@/styles/Form.module.css"
import Cookies from "js-cookie"



const LoginPage = () => {
    const [data, setData] =useState<User>({email: "" , password: "" ,})
    const [error, setError] =useState<null>(null) 
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          const user = { ...data };
          console.log(user)
          const res = await fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          const data1 = await res.json();
          console.log(data1);
          if (data1) {
            Cookies.set("token", data1.token, { expires: 7 });
            Cookies.set("user", JSON.stringify(data1.user.id), { expires: 7 });
            console.log(data1.user);
            setError(null);
          } else {
            setError(error);
          }
      
        } catch (error : any) {
          console.log(error.message);
          setError(error.message);
        }
      };
      
    
    
    
    return (
      <div className={styles.form}>
        {error && <p>{error}</p>}
        <h1>Log in</h1>
        <form className="form" onSubmit={handleSubmit}>
                <input value={data.email} onChange={(e) => setData({...data , email: e.target.value})} />
                <input value={data.password}  onChange={(e) => setData({...data, password: e.target.value })}/>
                <button>Submit</button>
         </form>
      </div>
    );
}


export default  LoginPage