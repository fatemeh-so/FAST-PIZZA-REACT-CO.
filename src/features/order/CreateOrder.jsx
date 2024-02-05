/* eslint-disable no-unused-vars */
// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getTotalCartPrice } from "../cart/CartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalPriceMain = withPriority
    ? formatCurrency(totalPrice) * 0.2 + formatCurrency(totalPrice)
    : formatCurrency(totalPrice);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const ErrorForm = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLoadingAddress = addressStatus === "loading";
  return (
    <div className="px-3 py-4">
      <h2>Ready to order? Lets go!</h2>
      <Form method="Post" className="mt-10">
        <div className="my-4  flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className=" sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={username}
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="my-4  flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className=" sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {ErrorForm?.phone && (
              <p className="my-5 rounded-3xl bg-red-100 px-3 py-2 text-xs text-red-800">
                {ErrorForm.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[1px] top-[32.5px] z-50 sm:right-[3px] sm:top-[2.5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex flex-row items-center gap-5 text-sm">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-5 accent-yellow-200 focus:outline-none  
            focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button  type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "placing order ..."
              : `Order now ${formatCurrency(totalPrice)} $ `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearItem());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
