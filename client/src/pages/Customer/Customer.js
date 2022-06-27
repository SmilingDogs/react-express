import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OneCustomer from "../../components/OneCustomer/OneCustomer";
import "./Customer.css";
import CustomerForm from "../../components/CustomerForm/CustomerForm";

const Customer = ({ match }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [customer, setCustomer] = useState(null);
  const [errorFirst, setErrorFirst] = useState("");
  const [errorSecond, setErrorSecond] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { customerId } = match.params;
  const url = match.url.split("/")[1];

  const editCustomer = (e) => {
    e.preventDefault();
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    setErrorFirst("");
    setErrorSecond("");
    axios
      .put(`/api/customers/${customerId}`, {
        firstName: firstName,
        lastName: lastName,
      })
      .then((res) => {
        if (res.status === 200) {
          setServerResponse(`Changed Customer with id ${customerId}`);
          setCustomer(res.data);
          setLoading(false);
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
    axios(`/api/customers/${customerId}`)
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.dir(err);
        setError(err.response.data);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) return "Loading...";

  if (error)
    return (
      <div>
        <p className="error">{error}</p>
        <Link to="/">Back</Link>
      </div>
    );

  return (
    <>
      <div className="customer">
        <OneCustomer {...customer} />
      </div>
      {serverResponse && <span>{serverResponse}</span>}
      <CustomerForm
        onSubmit={editCustomer}
        errorFirst={errorFirst}
        errorSecond={errorSecond}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
        location={url}
      />
      <Link to="/">Back</Link>
    </>
  );
};

export default Customer;
