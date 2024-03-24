import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Product from "../Product";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Header";


export default function UserProduct() {
    const navigate =useNavigate();
    const id =Cookies.get("id")
    console.log(id)
    console.log(localStorage.getItem("seller"))
    console.log(Cookies.get("access_token"))
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (Cookies.get("access_token") === undefined || localStorage.getItem("seller")===null || localStorage.getItem("seller")==="false") {
      navigate("/login");
    } else {
      fetch(`http://127.0.0.1:8000/api/userproducts/${id}`)
        .then((res) => res.json())
        .then((data) => setProducts(data)).then(console.log("PRODUCtS",products));
    }
    
  }, []);
  return (<>
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
  </>);
}
