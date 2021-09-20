import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import OneCustomer from "../components/OneCustomer/OneCustomer";
import "./Customer.css";

const Customer = ({ match }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const { customerId } = match.params;

  useEffect(() => {
    axios(`/api/customers/${customerId}`)
      .then(res => {
        setCustomer(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.dir(err)
        setError(err.response.data)
        setLoading(false)
      });

  }, [customerId]);

  if (loading) return "Loading...";

  if (error) return (
    <div >
    <p className="error">{error}</p>
    <Link to="/">Back</Link>
    </div>
  )

  return (
    <>
      <div className="customer"><OneCustomer {...customer}/></div>
      <Link to="/">Back</Link>
    </>
  );
};

export default Customer;
