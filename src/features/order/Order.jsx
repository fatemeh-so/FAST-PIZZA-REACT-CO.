/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from '../order/OrderItem'

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    // eslint-disable-next-line no-unused-vars
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className=" px-4 py-6 ">
      <div className="  flex flex-wrap items-center justify-between ">
        <h2 className=" px-2 font-semibold">Order #IIHGH Status</h2>

        <div className="space-x-4 mt-5">
          {priority && (
            <span className="text-medium rounded-full bg-red-600 p-3 tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="text-medium rounded-full bg-green-600 p-3 tracking-wide text-green-50">{status} order</span>
        </div>
      </div>

      <div className="bg-stone-300 p-4 my-10 flex flex-wrap items-center justify-between space-x-1">
        <p className="text-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
<ul className="mb-10 divide-y border-b border-t border-stone-300 divide-stone-300">
  {cart.map(item=><OrderItem item={item} key={item.id}/>)}
</ul>
      <div className="bg-stone-300 p-3 space-y-2">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;