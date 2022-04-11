import React from "react";
import CartIcon from "../../../../assets/CartIcon";
import styles from "./HeaderButton.module.css";
import cartContext from "../../../../store/Cart-Context";
import { useContext, useState, useEffect } from "react";

function HeaderButton(props) {
  const [showBumping, setShowBumping] = useState(false);
  const cartValue = useContext(cartContext);

  const itemQuantity = cartValue.items.reduce((currentItem, item) => {
    return currentItem + item.itemQty;
  }, 0);
  useEffect(() => {
    if (cartValue.items.length === 0) {
      return;
    }
    setShowBumping(true);
   const timer= setTimeout(() => {
      setShowBumping(false);
    }, 300);
return ()=>{
  clearTimeout(timer)
}

  }, [cartValue.items]);

  const classes = `${styles.button} ${showBumping ? styles.bump : ""}`;
  return (
    <button className={classes} onClick={props.onShowModal}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={styles.badge}>{itemQuantity}</span>
    </button>
  );
}

export default HeaderButton;
