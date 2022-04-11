import React from 'react'
import styles from "./Input.module.css"

function Input(props,ref) {
  return (
    <div className={styles.input}>
        <label htmlFor={props.input.id}>Amount</label>
        <input id={props.input.id} ref={ref} {...props.input}/>
    </div>
  )
}
const forwardedInput=React.forwardRef(Input)

export default forwardedInput