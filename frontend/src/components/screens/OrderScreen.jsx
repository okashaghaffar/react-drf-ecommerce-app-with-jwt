import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Moment from "react-moment";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const deliver = (id) => {
    console.log(id)
    fetch("http://127.0.0.1:8000/api/updatestatus", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderid: id
      }),
    });
    console.log("UPDATED STATUS nowww")
    window.location.href="/myorders"
  };

  useEffect(() => {
    if (
      Cookies.get("access_token") === undefined ||
      localStorage.getItem("seller") === null ||
      localStorage.getItem("seller") === "false"
    ) {
      // window.location.href = "/login";
      navigate("/login");
    } else {
      fetch("http://127.0.0.1:8000/api/getorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiver_id: Cookies.get("id"),
        }),
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, []);
  console.log(orders);

  return (
    <>
      <Header></Header>
      <div className="container">
        <h1>My Orders</h1>
      </div>
      <div className="container mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Order id</th>
              <th scope="col">Ordered by</th>
              <th scope="col">Product ID</th>
              <th scope="col">Product name</th>
              <th scope="col">User Email</th>
              <th scope="col">Order Date</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order.id}</td>
                <td
                  onClick={() => {
                    console.log(order);
                  }}
                >
                  {order.reciever.username}
                </td>
                <td>{order.product._id}</td>
                <td>{order.product.productname}</td>
                <td
                  onClick={() => {
                    console.log(order);
                  }}
                >
                  {order.reciever.email}
                </td>
                <td>
                  <Moment date={order.date}></Moment>
                </td>
                <td>
                  <Moment date={order.delivery_date}></Moment>
                </td>
                <td>{order.status}</td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Action buttons"
                  >
                    <button type="button" class="btn btn-success mx-1"
                    onClick={()=>{deliver(order.id)}}>
                      Deliver
                    </button>
                    <Link
                      type="button"
                      class="btn btn-primary"
                      to={`/products/${order.product._id}`}
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Total Orders = {orders.length}</h2>
      </div>
    </>
  );
}
