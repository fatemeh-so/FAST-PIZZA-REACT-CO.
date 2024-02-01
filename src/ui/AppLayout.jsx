import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Banner from "./Banner";
import { useState } from "react";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [deleteBtn, setDeleteBtn] = useState(false);
  function handelDelete() {
    setDeleteBtn(true);
  }

  return (
    <div  className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      {/* {deleteBtn===false? <Banner handelDelete={handelDelete}  /> : ""} */}

      {/* <h1>content</h1> */}
      <div className="overflow-y-scroll  ">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
