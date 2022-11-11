import {
  GET_CUSTOMERS,
  GET_DELETE_RESPONSE,
  GET_ERROR_FIRST,
  GET_ERROR_SECOND,
  GET_UPDATE_RESPONSE,
} from "./actionTypes";

export const initialState = {
  customers: [],
  errorFirst: "",
  errorSecond: "",
  deleteResponse: "",
  updateResponse: "",
};

export const customersReducer = (state, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_ERROR_FIRST:
      return {
        ...state,
        errorFirst: action.payload,
      };
    case GET_ERROR_SECOND:
      return {
        ...state,
        errorSecond: action.payload,
      };
    case GET_DELETE_RESPONSE:
      return {
        ...state,
        deleteResponse: action.payload,
      };
    case GET_UPDATE_RESPONSE:
      return {
        ...state,
        updateResponse: action.payload,
      };
    default:
      return state;
  }
};
