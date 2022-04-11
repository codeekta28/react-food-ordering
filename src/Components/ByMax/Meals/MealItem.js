import React from "react";
import Card from "../UI/Card/Card";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import cartContext from "../../../store/Cart-Context";

function MealItem(props) {
  const finalPrice = props.price.toFixed(2);
  const cartValue=useContext(cartContext)
  function addToCartHandler(amount) {
    // console.log("amount", amount);
    // console.log("cartValue",cartValue);
    cartValue.addItem({
      id:props.id,
      itemName:props.name,
      itemPrice:props.price,
      itemQty:amount
    })
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={styles.discription}>{props.detail}</p>
        <p className={styles.price}>Rs.{finalPrice}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
