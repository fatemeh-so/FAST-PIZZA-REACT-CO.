import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decriesItemQuantities, getCurrentQuantityById, increaseItemQuantities } from "./CartSlice";

function UpdateItemQuantities({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity=useSelector(getCurrentQuantityById(pizzaId))
  return (
    <div className="space-x-1">
      <Button
        type="round"
        onClick={() => dispatch(decriesItemQuantities(pizzaId))}
      >
        -
      </Button>
      <span className="text-xs font-medium ">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantities(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantities;
