import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Customers.css';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import CustomerComponent from '../../components/CustomerComponent/CustomerComponent';
import { sortByAlphabet } from '../../util/sort';

const Customers = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [errorFirst, setErrorFirst] = useState('');
  const [errorSecond, setErrorSecond] = useState('');
  const [deleteResponse, setDeleteResponse] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  //*Adding new Customer
  const addNewCustomer = (e) => {
    e.preventDefault();

    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    setErrorFirst('');
    setErrorSecond('');

    axios
      .post('/api/customers', {
        firstName: firstName,
        lastName: lastName,
      })
      .then((res) => {
        if (res.status === 201) {
          getCustomers();
          const {firstName, lastName} = res.data;
          setServerResponse(`Added New Customer: ${firstName} ${lastName}`);
          firstNameRef.current.value = '';
          lastNameRef.current.value = '';
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        let errorString = err.response.data;
        
        if (errorString.indexOf('firstName') > -1) {
          setErrorFirst(errorString);
        }
        if (errorString.indexOf('lastName') > -1) {
          setErrorSecond(errorString);
        }
        if (errorString.indexOf('exists!') > -1) {
          setErrorSecond(errorString);
        }
      });

    setTimeout(() => {
      setServerResponse('');
      setErrorFirst('');
      setErrorSecond('');
    }, 2000);
  };

  //*deleting Customer
  const deleteCustomer = (_id) => {
    axios
      .delete(`/api/customers/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          getCustomers();
          const { message } = res.data;
          setDeleteResponse(message);
        }
      })
      .catch((err) => console.log(err.response.data));

    setTimeout(() => {
      setDeleteResponse('');
    }, 2000);
  };

  //*Updating the state of customers array
  useEffect(() => {
    getCustomers();
  }, []); // for the 1st time render

  function getCustomers() {
    let cleanupFunction = false;

    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => {
        if (!cleanupFunction) setCustomers(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (cleanupFunction = true);
  }

  //*Mapping array to JSX expression

  const customersList = customers
    .sort(sortByAlphabet)
    .map((c) => (
      <CustomerComponent key={c._id} {...c} deleteCustomer={deleteCustomer} />
    ));

  return (
    <div>
      <h2 className='title'>
        {customers.length ? 'Customers' : 'No Customers'}
      </h2>
      <ul>{customersList}</ul>
      {deleteResponse && <span>{deleteResponse}</span>}
      {serverResponse && <span>{serverResponse}</span>}
      <CustomerForm
        onSubmit={addNewCustomer}
        errorFirst={errorFirst}
        errorSecond={errorSecond}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    </div>
  );
};

export default Customers;
