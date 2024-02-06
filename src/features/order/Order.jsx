/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "../order/OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

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
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher?.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  return (
    <div className=" px-4 py-6 ">
      <div className="  flex flex-wrap items-center justify-between ">
        <h2 className=" px-2 font-semibold">Order #IIHGH Status</h2>

        <div className="mt-5 space-x-4">
          {priority && (
            <span className="text-medium rounded-full bg-red-600 p-3 tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="text-medium rounded-full bg-green-600 p-3 tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="my-10 flex flex-wrap items-center justify-between space-x-1 bg-stone-300 p-4">
        <p className="text-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="mb-10 divide-y divide-stone-300 border-b border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients??[]}
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-300 p-3">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
<div className="mt-[20px] text-right">  {!priority && <UpdateOrder order={order} />}</div>
    
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
