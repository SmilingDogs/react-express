import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Customers.css";

const Customers = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [errorFirst, setErrorFirst] = useState("");
  const [errorSecond, setErrorSecond] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    setErrorFirst("");
    setErrorSecond("");
    axios({
      method: "POST",
      url: "/api/customers",
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setServerResponse("Added new Person!");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.includes("firstName")) {
          setErrorFirst(err.response.data);
        } else {
          setErrorSecond(err.response.data);
        }
      });

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    setTimeout(() => {
      setServerResponse("");
    }, 2000);
  };

  useEffect(() => {
    let cleanupFunction = false;

    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        if (!cleanupFunction) setCustomers(data);
      })
      .catch((err) => console.log(err));

    return () => (cleanupFunction = true);
  }, [customers]);

  const customersList = customers.map((c) => (
    <li key={c.id}>
      <Link to={`/customers/${c.id}`}>
        {c.firstName} {c.lastName}
      </Link>
      <button className="delete">&times;</button>
    </li>
  ));

  return (
    <div>
      <h2 className="title">Customers</h2>
      <ul>{customersList}</ul>
      <form className="form" id="myForm" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:
        <input type="text" name="firstName" id="firstName" ref={firstNameRef} />
        </label>
        {errorFirst && <span className="error-post">{errorFirst}</span>}
        <label htmlFor="lastName">Last Name:
        <input type="text" name="lastName" id="lastName" ref={lastNameRef} />
        </label>
        {errorSecond && <span className="error-post">{errorSecond}</span>}
        {serverResponse && <span>{serverResponse}</span>}
        <button type="submit" className="show">Add Customer</button>
      </form>
    </div>
  );
};

export default Customers;
