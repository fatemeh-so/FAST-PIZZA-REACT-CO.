import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <div className="flex items-center justify-between bg-yellow-500 text-stone-900 uppercase p-4 border-b border-stone-200">
      <Link to="/" className="tracking-widest">Fast Pizza React Co.</Link>
      <SearchOrder /> 
      <Username/>
    </div>
  );
}

export default Header;
