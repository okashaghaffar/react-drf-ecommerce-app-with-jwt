import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import {  useNavigate, useParams } from "react-router";
import Rating from "../Rating";
import Header from "../Header";
import Cookies from "js-cookie";
export default function Producscreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const uid = Cookies.get("id")
  console.log(product,"PRODUCG");
  localStorage.setItem("cart",[])
  const addToCart = () => {
    let cart =localStorage.getItem("cart");
    localStorage.setItem("cart",JSON.stringify(product))
     cart=localStorage.getItem("cart")
     navigate("/cart")
    console.log(cart,typeof(cart))
   

  };

  return (
    <div>
      <Header></Header>
      <Container>
      <Row>
        <Col md={3}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            fluid
          />
        </Col>

        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.productname}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Brand: {product.productbrand} </ListGroup.Item>

            <ListGroup.Item>Description: {product.productinfo}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price} Rs</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {
                  product.user===parseInt(uid)?<div>
                    your product you can't buy
                  </div>: <Button
                  className="btn-block btn-success"
                  disabled={product.stockcount === 0}
                  onClick={() => {addToCart()}}
                  type="button"
                >
                  Add to Cart
                </Button>
                }
               
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
