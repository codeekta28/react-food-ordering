import React from 'react'
import styles from "./Header.module.css"
import foodImage from "../../../../assets/headerImg.jpg"
import HeaderButton from './HeaderButton'

function Header(props) {
  return (
    <React.Fragment>
        <header className={styles.header}>
            <h1>Punjabi Beats</h1>
             <HeaderButton onShowModal={props.onShowModal}/>
        </header>
        <div className={styles["main-image"]}>
            <img src={foodImage} alt="table full of food" />
        </div>
    </React.Fragment>
  )
}

export default Header