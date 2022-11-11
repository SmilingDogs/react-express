import React, { useEffect, useReducer, useRef } from "react";
import axios from "axios";
import "./Customers.css";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import CustomerComponent from "../../components/CustomerComponent/CustomerComponent";
import { sortByAlphabet } from "../../util/sort";
import { customersReducer, initialState } from "../../reducer/customersReducer";
import {
  GET_CUSTOMERS,
  GET_DELETE_RESPONSE,
  GET_ERROR_FIRST,
  GET_ERROR_SECOND,
  GET_UPDATE_RESPONSE,
} from "../../reducer/actionTypes";

const Customers = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  // const [customers, setCustomers] = useState([]);
  // const [errorFirst, setErrorFirst] = useState('');
  // const [errorSecond, setErrorSecond] = useState('');
  // const [deleteResponse, setDeleteResponse] = useState('');
  // const [serverResponse, setServerResponse] = useState(''); //* when too many states => switch to useReducer()
  const [state, dispatch] = useReducer(customersReducer, initialState);

  //*Adding new Customer
  const addNewCustomer = (e) => {
    e.preventDefault();

    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    // setErrorFirst('');
    // setErrorSecond('');
    dispatch({ type: GET_ERROR_FIRST, payload: "" });
    dispatch({ type: GET_ERROR_SECOND, payload: "" });

    axios
      .post("/api/customers", {
        firstName: firstName,
        lastName: lastName,
      })
      .then((res) => {
        if (res.status === 201) {
          getCustomers();
          const { firstName, lastName } = res.data;
          // setServerResponse(`Added New Customer: ${firstName} ${lastName}`);
          dispatch({
            type: GET_UPDATE_RESPONSE,
            payload: `Added New Customer: ${firstName} ${lastName}`,
          });
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        let errorString = err.response.data;

        if (errorString.indexOf("firstName") > -1) {
          // setErrorFirst(errorString);
          dispatch({ type: GET_ERROR_FIRST, payload: errorString });
          console.log(state);
        }
        if (errorString.indexOf("lastName") > -1) {
          // setErrorSecond(errorString);
          dispatch({ type: GET_ERROR_SECOND, payload: errorString });
          console.log(state);
        }
        if (errorString.indexOf("exists!") > -1) {
          // setErrorSecond(errorString);
          dispatch({ type: GET_ERROR_SECOND, payload: errorString });
        }
      });

    setTimeout(() => {
      // setServerResponse("");
      // setErrorFirst("");
      // setErrorSecond("");
      dispatch({ type: GET_ERROR_FIRST, payload: "" });
      dispatch({ type: GET_ERROR_SECOND, payload: "" });
      dispatch({ type: GET_UPDATE_RESPONSE, payload: "" });
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
          // setDeleteResponse(message);
          dispatch({ type: GET_DELETE_RESPONSE, payload: message });
        }
      })
      .catch((err) => console.log(err.response.data));

    setTimeout(() => {
      // setDeleteResponse("");
      dispatch({ type: GET_DELETE_RESPONSE, payload: "" });
    }, 2000);
  };

  //* Updating the state of customers array
  useEffect(() => {
    getCustomers();
  }, []); //* for the 1st time render

  function getCustomers() {
    let cleanupFunction = false;

    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        if (!cleanupFunction) {
          dispatch({ type: GET_CUSTOMERS, payload: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (cleanupFunction = true);
  }

  //*Mapping array to JSX expression

  const customersList = state.customers
    .sort(sortByAlphabet)
    .map((c) => (
      <CustomerComponent key={c._id} {...c} deleteCustomer={deleteCustomer} />
    ));

  return (
    <div>
      <h2 className="title">
        {state.customers.length ? "Customers" : "No Customers"}
      </h2>
      <ul>{customersList}</ul>
      {state.deleteResponse && <span>{state.deleteResponse}</span>}
      {state.updateResponse && <span>{state.updateResponse}</span>}
      <CustomerForm
        onSubmit={addNewCustomer}
        errorFirst={state.errorFirst}
        errorSecond={state.errorSecond}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    </div>
  );
};

export default Customers;
