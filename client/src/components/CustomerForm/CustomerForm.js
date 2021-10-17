import React from "react";
import "./CustomerForm.css";

const CustomerForm = ({
  onSubmit,
  errorFirst,
  errorSecond,
  firstNameRef,
  lastNameRef,
  location
}) => {
  return (
    <form className="form" id="myForm" onSubmit={onSubmit}>
      <label htmlFor="firstName">
        First Name:
        <input type="text" name="firstName" id="firstName" ref={firstNameRef} />
      </label>
      {errorFirst && <span className="error-post">{errorFirst}</span>}
      <label htmlFor="lastName">
        Last Name:
        <input type="text" name="lastName" id="lastName" ref={lastNameRef} />
      </label>
      {errorSecond && <span className="error-post">{errorSecond}</span>}
      <button type="submit" className="show">{ location === 'customers' ? "Edit Customer" : "Add Customer" }</button>
    </form>
  );
};

export default CustomerForm;
