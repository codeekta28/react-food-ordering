import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
// focus on above line also we import it from react-dom which is a part of react library and it is not in curly brases
// we have created one div on index.html page to send the modal there
// we will create two more componnets as it is very simple so we will create it here itself
function Backdrop(props) {
  return <div onClick={props.onHideModal}className={styles.backdrop}></div>;
}
function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  const portalDestination = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onHideModal={props.onHideModal} />, portalDestination)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalDestination
      )}
    </React.Fragment>
  );
}

export default Modal;
