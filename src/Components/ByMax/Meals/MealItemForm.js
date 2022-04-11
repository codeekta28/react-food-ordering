import React, { useState } from "react";
import Input from "../UI/Input/Input";
import { useRef } from "react";
import styles from "./MealItemForm.module.css"

function MealItemForm(props) {
  const inputRef = useRef();
  function submitHandler(e) {
    e.preventDefault();
    // console.log("forward ref",inputRef.current.value);
    const finalAmount = inputRef.current.value;
    const finalAmountNumber = +finalAmount;
    // console.log("finalAmount", finalAmountNumber);

    props.onAddToCart(finalAmountNumber);
  }
  return (
    <form  className={styles.form} onSubmit={submitHandler}>
      <Input
        input={{
          ref: inputRef,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
          id: props.id,
        }}
      />

      <button>+Add</button>
      </form>
  );
}

export default MealItemForm;
