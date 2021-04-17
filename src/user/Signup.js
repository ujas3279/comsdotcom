import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import * as emailjs from "emailjs-com";
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './helper/FormContainer'
require('dotenv').config();

const Signup = () => {

  const strength=undefined;
  const color=undefined;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password:"",
    error: "",
    success: false,
    didRedirect: false
  });

  const { name, email, password,confirm_password, error, success, didRedirect } = values;

  const handleChange = name => event => {


    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const SendEmail=  (email,name)=>{
 
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLET_ID, {
        to_email:email,
        to_name:name
    },process.env.REACT_APP_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
    };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if(password!==confirm_password)
    {
      setValues({ ...values, error: "password and confirm password not match", success: false });
    }
    else if(!new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
    {
      setValues({ ...values, error: "email is not valid", success: false });
    }
    else if(new RegExp(/[0-9]/).test(password) && new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password) && new RegExp(/[!#@$%^&*)(+=._-]/).test(password))
    {
      signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          {SendEmail(email,name)};
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            confirm_password:"",
            error: "",
            success: true,
            didRedirect: true
          });
        }
      })
      .catch(console.log("Error in signup"));
    }
    else{
      setValues({ ...values, error: "password must be contain spacial character, small and capital latter and number ", success: false });
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />
    }
  };

  const signUpForm = () => {
    return (
      <FormContainer>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={handleChange("name")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={handleChange("email")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={handleChange("password")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirm_password}
            onChange={handleChange("confirm_password")}
          ></Form.Control>
        </Form.Group>

        <Button onClick={onSubmit} type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to="/signin">
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {performRedirect()}
    </>
  );
};

export default Signup;
