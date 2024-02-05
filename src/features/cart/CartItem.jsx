import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantities from "./UpdateItemQuantities";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center  justify-between  sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-2 item-center sm:gap-6">
            <UpdateItemQuantities pizzaId={pizzaId}/>
        <DeleteItem pizzaId={pizzaId} />
        </div>
      
      </div>
    </li>
  );
}

export default CartItem;
