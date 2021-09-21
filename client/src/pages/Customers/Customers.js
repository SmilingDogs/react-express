import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Customers.css";
import CustomerForm from "../../components/CustomerForm/CustomerForm";

const Customers = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [errorFirst, setErrorFirst] = useState("");
  const [errorSecond, setErrorSecond] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    setErrorFirst("");
    setErrorSecond("");
    axios
      .post("/api/customers", {
        firstName: firstName,
        lastName: lastName,
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
      <CustomerForm
        onSubmit={handlePostSubmit}
        errorFirst={errorFirst}
        errorSecond={errorSecond}
        serverResponse={serverResponse}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    </div>
  );
};

export default Customers;
