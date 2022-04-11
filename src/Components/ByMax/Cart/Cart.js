import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartItem from "./CartItem";
import { v4 as uuidv4 } from "uuid";

import cartContext from "../../../store/Cart-Context";
import CartCheckout from "./CartCheckout";
import axios from "axios";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const cartValue = useContext(cartContext);
  console.log("cartValue", cartValue);
  const finalAmount = cartValue.totalAmount.toFixed(2);
  // remove from cart
  function cartItemRemoveHandler(id) {
    cartValue.removeItem(id);
  }
  // add to cart
  function addItemToCartHandler(item) {
    // we are seperatly writing the qty bcoz right now qty can be many if items are duplicate
    cartValue.addItem({ ...item, itemQty: 1 });
  }
  // handling order button
  function handleOrder() {
    setIsCheckout(true);
  }
  // confirm button
  async function handleConfirm(formValue) {
    setIsConfirming(true);
    const url =
      "https://post-http-practice-default-rtdb.firebaseio.com/orders.json";
    const response = await axios.post(url, {
      method: "POST",
      body: {
        user: formValue,
        orderItem: cartValue.items,
      },
      header: {
        "Content-Type": "application/JSON",
      },
    });
    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
      cartValue.resetItem()
    }, 2000);
  }
  const cartItemValue = (
    <ul className={styles["cart-items"]}>
      {cartValue.items.map((item) => (
        <CartItem
          Key={item.id}
          name={item.itemName}
          price={item.itemPrice}
          amount={item.itemQty}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => addItemToCartHandler(item)}
        />
      ))}
    </ul>
  );
  // Buttons of form
  const modalAction = (
    <div className={styles.actions}>
      <button onClick={props.onHideModal} className={styles["button--alt"]}>
        close
      </button>
      {cartValue.items.length !== 0 && (
        <button className={styles.button} onClick={handleOrder}>
          order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <React.Fragment>
      {cartItemValue}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>Rs.{finalAmount}</span>
      </div>
      {!isCheckout && modalAction}
      {isCheckout && (
        <CartCheckout onConfirm={handleConfirm} onCancel={props.onHideModal} />
      )}
    </React.Fragment>
  );
  return (
    <Modal onHideModal={props.onHideModal}>
      {!isConfirming && !isConfirmed && cartContent}
      {isConfirming && !isConfirmed && (
        <h3>Sending Your Order To Restaurent</h3>
      )}
      {!isConfirming && isConfirmed && (
        <React.Fragment>
          <h2>Your Order Is Placed Successfully</h2>
          <button onClick={props.onHideModal} className={styles["button--alt"]}>
            close
          </button>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default Cart;
