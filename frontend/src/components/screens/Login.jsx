import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  localStorage.clear();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [spinner,setSpinner]=useState(false)
  const navigate = useNavigate();
  const [error,setError]=useState("")

  const submitHandler = async () => {
    
    const user = {
      username: username,
      password: password,
    };

    try {
      if (username==="" || password===""){
        setError("Fields can't be null")
        return

      }
      setSpinner(true);
      const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        // credentials: 'include'
      });

      if (!response.ok) {
        setSpinner(false)
        setError("Incorrect Credentials Provided")
        throw new Error("Login failed");
        
      }

      const data = await response.json();

      console.log(data);
      // Initialize the access & refresh token in local storage
     
      Cookies.set("access_token", data.access);
      Cookies.set("refresh_token",data.refresh)
      localStorage.setItem("seller", data.is_staff);
     
      Cookies.set("id",data.id)
      // localStorage.setItem("refresh_token", data.refresh);

      // Set Authorization header for subsequent requests
      const accessToken = data.access;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      if (data.is_staff){
        console.log("stafff")
        navigate("/myproducts")

      }
      else{

        navigate("/"); // Redirect to homepage
      }

      setSpinner(false);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <Container className="mt-3 d-flex flex-column align-items-center">
      <div style={{ fontSize: 30, margin: 10 }}>
        Welcome to Our E-commerce Application
      </div>
      <Form style={{ width: "50vh" }}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Password must have 8 characters
          </Form.Text>
        </Form.Group>

        <Button
          variant="success"
          onClick={() => {
            submitHandler();
          }}
        >
         {spinner?<div class="spinner-border spinner-border-sm" role="status">
</div>:<div>Login</div>}
        </Button>
      </Form>
      <small className="text-danger"  style={{color:"red"}}>
       {error}
        </small>
      <div>
        <small className="text-muted">
          Don't have an account ? <Link to={"/signup"}> Signup</Link>
        </small>
      </div>
    </Container>
  );
}
