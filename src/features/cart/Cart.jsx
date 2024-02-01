/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "../cart/CartItem";
import ButtonLink from "../../ui/ButtonLink";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart } from "./CartSlice";
import EmptyCart from './EmptyCart'
function Cart() {
  const username = useSelector((state) => state.user.username);

  const cart = useSelector(getCart);
  if(cart.length<1)return <EmptyCart/>
  const dispatch = useDispatch();
  return (
    <div className="px-4">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <h2 className="mt-8 text-xl font-semibold">Your cart, {username}</h2>

      <ul className=" divide-y divide-stone-300 border-b border-stone-300 py-4 ">
        {" "}
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-3 space-x-2 py-3">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearItem())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
