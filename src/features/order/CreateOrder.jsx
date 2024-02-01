/* eslint-disable no-unused-vars */
// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const ErrorForm = useActionData();
  const username=useSelector(state=>state.user.username)
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
        
          {ErrorForm?.phone && <p className="text-xs text-red-800 bg-red-100 rounded-3xl px-3 py-2 my-5">{ErrorForm.phone}</p>}
        </div>
  </div>
        <div className="my-4  flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className=" sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex flex-row items-center gap-5 text-sm">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-5 accent-yellow-200 focus:outline-none  
            focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "is placing order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = await Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "please inter correct Number";
  3;
  // console.log(errors.phone);
  if (Object.keys(errors).length > 0) return errors;
  console.log(errors);
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
