import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import Product from "../Product";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

export default function Homescreen() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  console.log(Cookies.get("access_token"));
  useEffect(() => {
    if (Cookies.get("access_token") === undefined) {
      // window.location.href = "/login";
      navigate("/login")
    } else {
      fetch("http://127.0.0.1:8000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
    // else{
    //  (async () => {
    //    try {
    //      const {data} = await axios.get(
    //                     'http://localhost:8000/home/', {
    //                      headers: {
    //                         'Content-Type': 'application/json'
    //                      }}
    //                    );
    //      setMessage(data.message);
    //   } catch (e) {
    //     console.log('not auth')
    //   }
    //  })()};
  }, []);

  console.log(products);
  return (
  <>
    <Header></Header>
    <Container>
      <br></br>
      <h1>Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={6} sm={12} lg={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}
