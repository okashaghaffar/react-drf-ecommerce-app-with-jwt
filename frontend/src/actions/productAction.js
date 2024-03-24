import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
} from "../constants/productConstant";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({type:PRODUCT_LIST_REQUEST})
    const data=fetch("http://127.0.0.1:8000/api/products").
    then(res=>res.json());
    dispatch({type:PRODUCT_LIST_SUCCESS,
    payload:data})
  } catch (e) {
    dispatch({type:PRODUCT_LIST_FAILURE,
    payload:e.response && e.response.data.detail ?e.response.data.detail :e.message})
  }
};
