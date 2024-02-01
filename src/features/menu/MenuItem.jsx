import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const getCurrentQuantity=useSelector(getCurrentQuantityById(id))
  const isInCart=getCurrentQuantity>0
  // console.log(getCurrentQuantity);
  function handelAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    console.log(newItem);
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex  gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && isInCart&& <DeleteItem pizzaId={id} />}{" "}
          {!soldOut && !isInCart&& (
            <Button type="small" onClick={handelAddItem}>
              ADD TO CART
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
