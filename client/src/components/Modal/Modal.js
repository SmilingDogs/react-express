import React from "react";
import "./Modal.css";

const Modal = ({ open, close, children }) => {
  return (
    <div className={open ? "modal-background open" : "modal-background"} onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
