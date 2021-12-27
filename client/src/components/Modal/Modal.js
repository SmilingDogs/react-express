import React from "react";
import "./Modal.css";

const Modal = ({ open, setModalClose, children }) => {
  return (
    <div className={open ? "modal-background open" : "modal-background"} onClick={setModalClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
