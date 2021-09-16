import React, { useEffect, useRef, useState } from "react";
import "./Customers.css";

const Customers = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setServerResponse("Added new Person!");
        }
      })
      .catch((err) => console.log(err));

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    setTimeout(() => {
      setServerResponse("");
    }, 3000);
  };

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((err) => console.log(err));
  }, [customers]);

  const customersList = customers.map((c) => (
    <li key={c.id}>
      {c.firstName} {c.lastName}
    </li>
  ));

  return (
    <div className='content'>
      <h2>Customers</h2>
      <ul>{customersList}</ul>
      <form className="form" id="myForm" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" ref={firstNameRef} />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" ref={lastNameRef} />
        {serverResponse && <span>{serverResponse}</span>}
        <button type="submit" className="show">
          Add Name
        </button>
      </form>
    </div>
  );
};

export default Customers;
