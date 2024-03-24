import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={`http://127.0.0.1:8000${product.image}`}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`} className="text-dark">
          <Card.Title as="div">
            <strong>{product.productname}</strong>
          </Card.Title>
        </Link>
        
        <Card.Text as="h6">
        {product.price} Rs
        </Card.Text>
        <Rating
        value={product.rating}
        text={` ${product.numReviews} reviews`}
        color={"#f8e825"}
        ></Rating>
        <Card.Text as="div">
          <div className="my-1">Seller {product.user.username}</div>
        </Card.Text>
      </Card.Body>
      
    </Card>
  );
}
