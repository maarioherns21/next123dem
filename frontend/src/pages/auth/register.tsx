import { User } from "@/components/ModelTS/Model"
import { FormEvent, useState } from "react"
import styles from "@/styles/Form.module.css"
import Cookies from "js-cookie"


const RegisterPage = () => {
const [data, setData] =useState<User>({username: "" , email:"" , password: "" , image: ""})
const [error, setError] =useState<null>(null) 

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const user = { ...data };
    console.log(user);
    const formData   = new FormData()
    formData.append("username" , data.username)
    formData.append("email" , data.email)
    formData.append("password", data.password)
    formData.append("image", data.image)
    const res = await fetch("http://localhost:3001/api/users/register" , {
        method: "POST",
        body: formData
    })
    const data1 = await res.json()
    console.log(data1)
    if (data1) {
        Cookies.set("token", data1.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(data1.user.id), { expires: 7 });
        console.log(data1.user)
        setError(null);
      } else {
        setError(data1.message);
      }
  } catch (error) {
    console.log(error);
  }
};


return (
  <div className={styles.form}>
    <h1>Register</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        name="username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <input
        name="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        name="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <input
       type="file"
        name="image"
        onChange={(e: any) => setData({ ...data, image: e.target.files[0] })}
      />
      <button>Submit</button>
    </form>
  </div>
);
}


export default  RegisterPage