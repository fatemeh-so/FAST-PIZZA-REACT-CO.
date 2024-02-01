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
    </li>
  );
}

export default OrderItem;
