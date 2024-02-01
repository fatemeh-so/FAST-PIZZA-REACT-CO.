import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";

function CartOverview() {
  const totalPrice=useSelector(getTotalCartPrice)
  const totalQuantity=useSelector(getTotalCartQuantity)

  if(!totalPrice)return null;
  return (
    <div className=" flex items-center justify-between bg-stone-800 text-stone-200 p-4 uppercase text-sm" >
      <p className="text-stone-300 space-x-6 ">
        <span className="font-semibold">{totalQuantity} pizzas</span>
        <span>{totalPrice} $</span>
      </p>
      <Link to="/cart" className="uppercase ">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
