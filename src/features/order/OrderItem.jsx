import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="p-3">
      <div className="flex items-center flex-row justify-between flex-wrap  ">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold ">{formatCurrency(totalPrice)}</p>
      </div>
      <p className=" text-sm capitalize italic text-stone-500">
          {isLoadingIngredients?'isLoading...':ingredients.join(", ")}
        </p>
    </li>
  );
}

export default OrderItem;
