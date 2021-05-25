import classes from "./Modal.module.css";
import React from "react";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  let classList;
  if (props.show) {
    classList = [classes.modal];
  } else {
    classList = [classes.modal + classes.modal_not_shown];
  }
  return (
    <React.Fragment>
      {props.show ? <Backdrop clicked={props.cancelModal} /> : null}
      <div
        className={classList.join(" ")}
        style={{ height: props.show ? props.height : "0px" }}
      >
        {props.show ? props.children : null}
      </div>
    </React.Fragment>
  );
};

export default modal;
