import React from "react";

const OneCustomer = ({ id, firstName, lastName }) => {
  
  return (
    <div>
      <span>{id}</span> <span>{firstName}</span> <span>{lastName}</span>
    </div>
  );
};

export default OneCustomer;
