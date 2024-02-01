// import { useSelector } from "react-redux";

import {useSelector} from 'react-redux'
function Username() {
  const username=useSelector(state=>state.user.username)
  return <div className="hidden uppercase md:block">{username}</div>;
}

export default Username;
