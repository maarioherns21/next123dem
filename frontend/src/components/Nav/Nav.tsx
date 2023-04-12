import Link from "next/link"
import { FC } from "react";
import { useCookies } from "react-cookie";



const Nav:FC= () => {
  const [cookies]: any = useCookies(["user"])

  
  
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/form"}>Form</Link>
        </li>
        <li>
       <Link href={`/profile`}>Profile</Link>
        </li>
        <li>
        <Link href={"/auth/login"}>Login</Link>
        </li>
         <li>
         <Link href={"/auth/register"}>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav

