import React from "react";
import { Link } from "react-router-dom";
import { useModalState } from "../../hooks/useModalState";
import Modal from "../Modal/Modal";

const CustomerComponent = ({ id, firstName, lastName, deleteCustomer }) => {
  const { isOpen, onOpen, onClose } = useModalState();

  return (
    <div>
      <li className="list-item">
        <button className="delete">&times;</button>
        <Link to={`/customers/${id}`} className="list-item__title">
          {firstName} {lastName}
        </Link>
        <button className="delete" onClick={onOpen}>
          &times;
        </button>
      </li>
      <Modal open={isOpen} setModalClose={onClose}>
        <h2>You are deleting {firstName} {lastName}. Sure?</h2>
        <div className="buttons-block">
          <button onClick={() => deleteCustomer(id)}>YES</button>
          <button onClick={onClose}>NO</button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerComponent;