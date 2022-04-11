import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/ByMax/Layout/Header/Header";
import Meal from "./Components/ByMax/Meals/Meal";
import Cart from "./Components/ByMax/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
import CartCheckout from "./Components/ByMax/Cart/CartCheckout";

function App() {
  // to make modal open and close we need 2 functions and one state
  const [modalActivity, setModalActivity] = useState(false);
  function showModalHandle() {
    setModalActivity(true);
  }
  function hideModalHandle() {
    setModalActivity(false);
  }
  return (
    <CartProvider>
      {modalActivity && <Cart onHideModal={hideModalHandle} />}
      <Header onShowModal={showModalHandle} />
      <main>
        <Meal />
     
      </main>
    </CartProvider>
  );
}

export default App;
