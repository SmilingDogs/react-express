import React from "react";

const OneCustomer = ({ firstName, lastName }) => {

  return (
    <div>
     <span>{firstName}</span> <span>{lastName}</span>
    </div>
  );
};

export default OneCustomer;
