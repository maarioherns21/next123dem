import Link from "next/link"
import { FC } from "react";
import { useCookies } from "react-cookie";



const Nav:FC= () => {
  const [cookies]: any = useCookies(["user"])
  console.log("cookies:", cookies)
  console.log("user:", cookies?.user)
  

  
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
      {cookies &&  <Link href={`/profile`}>Profile</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav

