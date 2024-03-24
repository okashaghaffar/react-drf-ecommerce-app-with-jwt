import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useState } from "react";
export default function Signup() {
  const [fname,setfname]=useState("");
  const [lname,setlname]=useState("");
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [password2,setpassword2]=useState("");
  const [error,setError]=useState("");
  const [color,setColor]=useState("red");



  const submitHandler=()=>{
    if ( username==="" || password==="" ||email==="" ||fname==="" ||lname===""){
      setError("Fields can't be null")
      return

    }


    if (password!==password2){
      setError("Your passwords doesn't match")
      return
    }
    if (password.length<8){
      setError("Password must be 8 characters long")
      return

    }
    else{

    
    
    fetch("http://127.0.0.1:8000/api/users/register",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            username: username,
            password:password,
            email:email,
            firstname:fname,
            lastname:lname

          })
      }).then(res => res.json()).then(data => console.log("This is response data",data))
      setemail("");setfname("");setpassword("");setlname("");setpassword2("");setusername("");setError("Your user has been created");setColor("green")
  
  
  }}


  return (
    <Container className="mt-3">
      <Form >
      <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter User Name" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
        </Form.Group>
      <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name"  value={fname} onChange={(e)=>{setfname(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name"  value={lname} onChange={(e)=>{setlname(e.target.value)}}/>
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  value={email}  onChange={(e)=>{setemail(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <Form.Text className="text-muted">
           Password must have 8 characters
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="re enter Password" value={password2} onChange={(e)=>{setpassword2(e.target.value)}}/>
          <Form.Text className="text-muted">
           Password must have 8 characters
          </Form.Text>
        </Form.Group>
        <div style={{color:color,marginBottom:12}}>
          {error}
        </div>
        
        <Button variant="success" onClick={()=>{submitHandler()}}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
