import React from "react";
import Header from "./Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function Cart() {
  const navigate = useNavigate()
  const placeorder = () => {
    console.log(Cookies.get("id"), order._id, order.user.id);
    fetch("http://127.0.0.1:8000/api/addorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: order.user.id,
        reciever: parseInt(Cookies.get("id")),
        product: order._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      localStorage.setItem("cart",null)
      navigate("/cart")
  };

  let order = JSON.parse(localStorage.getItem("cart"));

  console.log("CART", order, typeof order);
  return (
    <div>
      <Header></Header>
      {order ? (
        <div>
          <div className="container">
            <h1>My Orders</h1>
          </div>
          <div className="container mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">brand</th>
                  <th scope="col">category</th>
                  <th scope="col">price</th>
                  <th scope="col">Image</th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr>
                    <td>{order.productname}</td>
                    <td>{order.productbrand}</td>
                    <td>{order.productcategory}</td>
                    <td>{order.price}</td>
                    <td>
                      <img src={`http://127.0.0.1:8000${order.image}`} alt="" />
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <div className="container mt-3">
          <div className="row">
            <div className="col">
              <button className="btn btn-success mr-2" onClick={()=>{placeorder()}}>Place Order</button>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={()=>{
                localStorage.setItem("cart",null)
                navigate("/cart")
                
              
              }}>Remove </button>
            </div>
          </div>
        </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="alert alert-info" role="alert">
            Nothing here. Your cart is empty.
          </div>
        </div>
      )}
    </div>
  );
}
