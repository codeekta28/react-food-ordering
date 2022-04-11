import React from "react";
import classes from "./CartCheckout.module.css";
import CustomInput from "../UI/Input/CustomInput";

import useInput from "../../../hook/use-Input";

function CartCheckout(props) {
  const inputLength=value=>value.trim().length!==0
  const noOfChars=value=>value.trim().length>=4
  // Name
  const {
    handleChange: nameHandleChange,
    handleBlur: nameHandleBlur,
    reset: nameReset,
    inputValue: nameInputValue,
    isInputValid: isNameValid,
    inputClass: nameInputClass,
    hasError: nameHasError,
  } = useInput(inputLength);

  // street
  const {
    handleChange: streetHandleChange,
    handleBlur: streetHandleBlur,
    reset: streetReset,
    inputValue: streetInputValue,
    isInputValid: isStreetValid,
    inputClass: streetInputClass,
    hasError: streetHasError,
  } = useInput(inputLength);
  // Postal
  const {
    handleChange: postalHandleChange,
    handleBlur: postalHandleBlur,
    reset: postalReset,
    inputValue: postalInputValue,
    isInputValid: isPostalValid,
    inputClass: postalInputClass,
    hasError: postalHasError,
  } = useInput(noOfChars);

  // City
  const {
    handleChange: cityHandleChange,
    handleBlur: cityHandleBlur,
    reset: cityReset,
    inputValue: cityInputValue,
    isInputValid: isCityValid,
    inputClass: cityInputClass,
    hasError: cityHasError,
  } = useInput(inputLength);

  // SubmitHandler
  function handleSubmit(e) {
    e.preventDefault();
    nameReset();
    streetReset();
    postalReset();
    const formValue={
      name:nameInputValue,
      street:streetInputValue,
      postal:postalInputValue,
      city:cityInputValue,
    }
    props.onConfirm(formValue)
  }
  let isFormValid = false;
  if (isNameValid && isStreetValid && isPostalValid) {
    isFormValid = true;
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <CustomInput
        onChange={nameHandleChange}
        onBlur={nameHandleBlur}
        htmlFor="name"
        label="Name"
        type="text"
        errorMsg="Dont Keep the Name Input Empty"
        hasError={nameHasError}
        value={nameInputValue}
        inputClass={nameInputClass}
      />
      <CustomInput
        onChange={streetHandleChange}
        onBlur={streetHandleBlur}
        htmlFor="street"
        label="Street"
        type="text"
        errorMsg="Dont Keep the street Input Empty"
        hasError={streetHasError}
        value={streetInputValue}
        inputClass={streetInputClass}
      />
      <CustomInput
        onChange={postalHandleChange}
        onBlur={postalHandleBlur}
        htmlFor="postal"
        label="Postal-Code"
        type="text"
        errorMsg="length is less(>=4 chars)"
        hasError={postalHasError}
        value={postalInputValue}
        inputClass={postalInputClass}
      />
      <CustomInput
        onChange={cityHandleChange}
        onBlur={cityHandleBlur}
        htmlFor="city"
        label="City"
        type="text"
        errorMsg="Dont Keep the city Empty"
        hasError={cityHasError}
        value={cityInputValue}
        inputClass={cityInputClass}
      />
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CartCheckout;
