import { FC } from "react"
import { Movie } from "../ModelTS/Model"


interface Props {
  data: Movie;
}

const ProfileDetails: FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>{data.username}</h2>
      <h3>{data.email}</h3>
      <h4>{data.image}</h4>
      <h4>{data._id}</h4>
    </div>
  );
};


export default ProfileDetails