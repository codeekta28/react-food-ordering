import React from 'react'
import styles from "./CustomInput.module.css"

function CustomInput(props) {
    const finalClass=props.inputClass
    const classes = `${styles.control} ${styles[finalClass]}`;
    return (
      <div className={classes}>
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <input
          id={props.htmlFor}
          onChange={props.onChange}
          onBlur={props.onBlur}
          type={props.type}
          value={props.value}
        />
        {props.hasError && <p className={styles["error-text"]}>{props.errorMsg}</p>}
      </div>
    );
}

export default CustomInput